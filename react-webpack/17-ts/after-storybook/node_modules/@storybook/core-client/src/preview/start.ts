import global from 'global';
import deprecate from 'util-deprecate';
import { ClientApi } from '@storybook/client-api';
import { PreviewWeb } from '@storybook/preview-web';
import type { AnyFramework, ArgsStoryFn } from '@storybook/csf';
import { createChannel } from '@storybook/channel-postmessage';
import { addons } from '@storybook/addons';
import { FORCE_RE_RENDER } from '@storybook/core-events';
import type { Path, WebProjectAnnotations } from '@storybook/store';

import { Loadable } from './types';
import { executeLoadableForChanges } from './executeLoadable';

const { window: globalWindow, FEATURES } = global;

const configureDeprecationWarning = deprecate(
  () => {},
  `\`configure()\` is deprecated and will be removed in Storybook 7.0. 
Please use the \`stories\` field of \`main.js\` to load stories.
Read more at https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-configure`
);

const removedApi = (name: string) => () => {
  throw new Error(`@storybook/client-api:${name} was removed in storyStoreV7.`);
};

interface RendererImplementation<TFramework extends AnyFramework> {
  decorateStory?: WebProjectAnnotations<TFramework>['applyDecorators'];
  render?: ArgsStoryFn<TFramework>;
}

interface ClientAPIFacade {
  /* deprecated */
  addDecorator: (...args: any[]) => never;
  /* deprecated */
  addParameters: (...args: any[]) => never;
  /* deprecated */
  clearDecorators: (...args: any[]) => never;
  /* deprecated */
  addLoader: (...args: any[]) => never;
  /* deprecated */
  setAddon: (...args: any[]) => never;
  /* deprecated */
  getStorybook: (...args: any[]) => never;
  /* deprecated */
  storiesOf: (...args: any[]) => never;
  /* deprecated */
  raw: (...args: any[]) => never;
}

interface StartReturnValue<TFramework extends AnyFramework> {
  /* deprecated */
  forceReRender: () => void;
  /* deprecated */
  getStorybook: any;
  /* deprecated */
  configure: any;
  /* deprecated */
  clientApi: ClientApi<TFramework> | ClientAPIFacade;
}

export function start<TFramework extends AnyFramework>(
  renderToDOM: WebProjectAnnotations<TFramework>['renderToDOM'],
  { decorateStory, render }: RendererImplementation<TFramework> = {}
): StartReturnValue<TFramework> {
  if (globalWindow) {
    // To enable user code to detect if it is running in Storybook
    globalWindow.IS_STORYBOOK = true;
  }

  if (FEATURES?.storyStoreV7) {
    return {
      forceReRender: removedApi('forceReRender'),
      getStorybook: removedApi('getStorybook'),
      configure: removedApi('configure'),
      clientApi: {
        addDecorator: removedApi('clientApi.addDecorator'),
        addParameters: removedApi('clientApi.addParameters'),
        clearDecorators: removedApi('clientApi.clearDecorators'),
        addLoader: removedApi('clientApi.addLoader'),
        setAddon: removedApi('clientApi.setAddon'),
        getStorybook: removedApi('clientApi.getStorybook'),
        storiesOf: removedApi('clientApi.storiesOf'),
        raw: removedApi('raw'),
      },
    };
  }

  const channel = createChannel({ page: 'preview' });
  addons.setChannel(channel);

  const clientApi = new ClientApi<TFramework>();
  const preview = new PreviewWeb<TFramework>();
  let initialized = false;

  const importFn = (path: Path) => clientApi.importFn(path);
  function onStoriesChanged() {
    const storyIndex = clientApi.getStoryIndex();
    preview.onStoriesChanged({ storyIndex, importFn });
  }

  // These two bits are a bit ugly, but due to dependencies, `ClientApi` cannot have
  // direct reference to `PreviewWeb`, so we need to patch in bits
  clientApi.onImportFnChanged = onStoriesChanged;
  clientApi.storyStore = preview.storyStore;

  if (globalWindow) {
    globalWindow.__STORYBOOK_CLIENT_API__ = clientApi;
    globalWindow.__STORYBOOK_ADDONS_CHANNEL__ = channel;
    // eslint-disable-next-line no-underscore-dangle
    globalWindow.__STORYBOOK_PREVIEW__ = preview;
    globalWindow.__STORYBOOK_STORY_STORE__ = preview.storyStore;
  }

  return {
    forceReRender: () => channel.emit(FORCE_RE_RENDER),
    getStorybook: (): void[] => [],

    clientApi,
    // This gets called each time the user calls configure (i.e. once per HMR)
    // The first time, it constructs the preview, subsequently it updates it
    configure(
      framework: string,
      loadable: Loadable,
      m?: NodeModule,
      showDeprecationWarning = true
    ) {
      if (showDeprecationWarning) {
        configureDeprecationWarning();
      }

      clientApi.addParameters({ framework });

      // We need to run the `executeLoadableForChanges` function *inside* the `getProjectAnnotations
      // function in case it throws. So we also need to process its output there also
      const getProjectAnnotations = () => {
        const { added, removed } = executeLoadableForChanges(loadable, m);

        Array.from(added.entries()).forEach(([fileName, fileExports]) =>
          clientApi.facade.addStoriesFromExports(fileName, fileExports)
        );

        Array.from(removed.entries()).forEach(([fileName]) =>
          clientApi.facade.clearFilenameExports(fileName)
        );

        return {
          render,
          ...clientApi.facade.projectAnnotations,
          renderToDOM,
          applyDecorators: decorateStory,
        };
      };

      if (!initialized) {
        preview.initialize({
          getStoryIndex: () => clientApi.getStoryIndex(),
          importFn,
          getProjectAnnotations,
        });
        initialized = true;
      } else {
        // TODO -- why don't we care about the new annotations?
        getProjectAnnotations();
        onStoriesChanged();
      }
    },
  };
}
