
export class UtilsService {

  public toggleNotification(): void {
    const elem: Element = document.getElementById('snackbar');
    elem.className = 'show';
    setTimeout(() => { elem.className = elem.className.replace('show', ''); }, 3000);
  }

  public toggleCart(): void {
    const elem: Element = document.getElementById('mini-cart');
    console.log(elem);
    elem.className = 'show';
    setTimeout(() => { elem.className = elem.className.replace('show', ''); }, 3000);
  }
}
