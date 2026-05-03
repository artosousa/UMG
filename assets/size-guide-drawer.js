class SizeGuideDrawer extends HTMLElement {
    constructor() {
      super();
  
      this.addEventListener('keyup', (evt) => evt.code === 'Escape' && this.close());
      const overlay = this.querySelector('.size-guide-drawer__overlay');
      if (overlay) overlay.addEventListener('click', this.close.bind(this));
    }
  
    open(triggeredBy) {
      if (triggeredBy) this.setActiveElement(triggeredBy);
      setTimeout(() => {
        this.classList.add('animate', 'active');
      });
  
      this.addEventListener(
        'transitionend',
        () => {
          const containerToTrapFocusOn =
            this.querySelector('.size-guide-drawer__inner-wrapper') || this;
          const focusElement =
            this.querySelector('.drawer__inner') || this.querySelector('.drawer__close');
          trapFocus(containerToTrapFocusOn, focusElement);
        },
        { once: true }
      );
  
      document.body.classList.add('overflow-hidden');
    }
  
    close() {
      this.classList.remove('active');
      removeTrapFocus(this.activeElement);
      document.body.classList.remove('overflow-hidden');
    }
  
    setActiveElement(element) {
      this.activeElement = element;
    }
  }
  
  customElements.define('size-guide-drawer', SizeGuideDrawer);