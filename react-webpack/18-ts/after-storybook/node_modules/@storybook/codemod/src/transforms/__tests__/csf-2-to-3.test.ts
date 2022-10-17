import { describe } from '@jest/globals';
import { dedent } from 'ts-dedent';
import _transform from '../csf-2-to-3';

// @ts-expect-error (Converted from ts-ignore)
expect.addSnapshotSerializer({
  print: (val: any) => val,
  test: (val) => true,
});

const jsTransform = (source: string) => _transform({ source }, null, {}).trim();
const tsTransform = (source: string) => _transform({ source }, null, { parser: 'tsx' }).trim();

describe('csf-2-to-3', () => {
  describe('javascript', () => {
    it('should replace non-simple function exports with objects', () => {
      expect(
        jsTransform(dedent`
          export default { title: 'Cat' };
          export const A = () => <Cat />;
          export const B = (args) => <Button {...args} />;
        `)
      ).toMatchInlineSnapshot(`
        export default {
          title: 'Cat',
        };
        export const A = () => <Cat />;
        export const B = {
          render: (args) => <Button {...args} />,
        };
      `);
    });

    it('should move annotations into story objects', () => {
      expect(
        jsTransform(dedent`
          export default { title: 'Cat' };
          export const A = () => <Cat />;
          A.storyName = 'foo';
          A.parameters = { bar: 2 };
          A.play = () => {};
        `)
      ).toMatchInlineSnapshot(`
        export default {
          title: 'Cat',
        };
        export const A = {
          render: () => <Cat />,
          name: 'foo',
          parameters: {
            bar: 2,
          },
          play: () => {},
        };
      `);
    });

    it('should ignore non-story exports, statements', () => {
      expect(
        jsTransform(dedent`
          export default { title: 'components/Fruit', includeStories: ['A'] };
          export const A = (args) => <Apple {...args} />;
          export const B = (args) => <Banana {...args} />;
          const C = (args) => <Cherry {...args} />;
        `)
      ).toMatchInlineSnapshot(`
        export default {
          title: 'components/Fruit',
          includeStories: ['A'],
        };
        export const A = {
          render: (args) => <Apple {...args} />,
        };
        export const B = (args) => <Banana {...args} />;
        const C = (args) => <Cherry {...args} />;
      `);
    });

    it('should do nothing when there is no meta', () => {
      expect(
        jsTransform(dedent`
          export const A = () => <Apple />;
          export const B = (args) => <Banana {...args} />;
        `)
      ).toMatchInlineSnapshot(`
        export const A = () => <Apple />;
        export const B = (args) => <Banana {...args} />;
      `);
    });

    it('should remove implicit global render function (react)', () => {
      expect(
        jsTransform(dedent`
          export default { title: 'Cat', component: Cat };
          export const A = (args) => <Cat {...args} />;
          export const B = (args) => <Banana {...args} />;
        `)
      ).toMatchInlineSnapshot(`
        export default {
          title: 'Cat',
          component: Cat,
        };
        export const A = {};
        export const B = {
          render: (args) => <Banana {...args} />,
        };
      `);
    });

    it('should ignore object exports', () => {
      expect(
        jsTransform(dedent`
          export default { title: 'Cat', component: Cat };
          export const A = {
            render: (args) => <Cat {...args} />
          };
        `)
      ).toMatchInlineSnapshot(`
        export default {
          title: 'Cat',
          component: Cat,
        };
        export const A = {
          render: (args) => <Cat {...args} />,
        };
      `);
    });

    it('should hoist template.bind (if there is only one)', () => {
      expect(
        jsTransform(dedent`
          export default { title: 'Cat' };
          const Template = (args) => <Cat {...args} />;
          export const A = Template.bind({});
          A.args = { isPrimary: false };
        `)
      ).toMatchInlineSnapshot(`
        export default {
          title: 'Cat',
        };
        export const A = {
          render: (args) => <Cat {...args} />,
          args: {
            isPrimary: false,
          },
        };
      `);
    });

    it('should remove implicit global render for template.bind', () => {
      expect(
        jsTransform(dedent`
          export default { title: 'Cat', component: Cat };
          const Template = (args) => <Cat {...args} />;
          export const A = Template.bind({});
          A.args = { isPrimary: false };
          const Template2 = (args) => <Banana {...args} />;
          export const B = Template2.bind({});
          B.args = { isPrimary: true };
        `)
      ).toMatchInlineSnapshot(`
        export default {
          title: 'Cat',
          component: Cat,
        };
        export const A = {
          args: {
            isPrimary: false,
          },
        };
        export const B = {
          render: (args) => <Banana {...args} />,
          args: {
            isPrimary: true,
          },
        };
      `);
    });

    it('should ignore no-arg stories without annotations', () => {
      expect(
        jsTransform(dedent`
          export default { title: 'Cat', component: Cat };
          export const A = (args) => <Cat {...args} />;
          export const B = () => <Cat name="frisky" />;
          export const C = () => <Cat name="fluffy" />;
          C.parameters = { foo: 2 };
        `)
      ).toMatchInlineSnapshot(`
        export default {
          title: 'Cat',
          component: Cat,
        };
        export const A = {};
        export const B = () => <Cat name="frisky" />;
        export const C = {
          render: () => <Cat name="fluffy" />,
          parameters: {
            foo: 2,
          },
        };
      `);
    });

    it('should work for v1-style annotations', () => {
      expect(
        jsTransform(dedent`
          export default { title: 'Cat' };
          export const A = (args) => <Cat {...args} />;
          A.story = {
            parameters: { foo: 2 }
          };
        `)
      ).toMatchInlineSnapshot(`
        export default {
          title: 'Cat',
        };
        export const A = {
          render: (args) => <Cat {...args} />,
          parameters: {
            foo: 2,
          },
        };
      `);
    });
  });

  describe('typescript', () => {
    it('should replace function exports with objects', () => {
      expect(
        tsTransform(dedent`
          export default { title: 'Cat' } as Meta<CatProps>;
          export const A: Story<CatProps> = (args) => <Cat {...args} />;
          export const B: any = (args) => <Button {...args} />;
          export const C: Story<CatProps> = () => <Cat />;
        `)
      ).toMatchInlineSnapshot(`
        export default {
          title: 'Cat',
        } as Meta<CatProps>;
        export const A: Story<CatProps> = {
          render: (args) => <Cat {...args} />,
        };
        export const B: any = {
          render: (args) => <Button {...args} />,
        };
        export const C: Story<CatProps> = () => <Cat />;
      `);
    });
  });
});
