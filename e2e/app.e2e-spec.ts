import { TrazabilidadPage } from './app.po';

describe('trazabilidad App', () => {
  let page: TrazabilidadPage;

  beforeEach(() => {
    page = new TrazabilidadPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
