import { YoutubeAppPage } from './app.po';

describe('youtube-app App', () => {
  let page: YoutubeAppPage;

  beforeEach(() => {
    page = new YoutubeAppPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
