export const parameters = {
  docs: {
    renderer: async () => {
      const {
        DocsRenderer
      } = await import('./DocsRenderer');
      return new DocsRenderer();
    }
  }
};