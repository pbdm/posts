export default class BasePage {
  constructor() {
    this.test && this.test();
  }

  created() {
    console.log('basepageCreated');
  }

}
