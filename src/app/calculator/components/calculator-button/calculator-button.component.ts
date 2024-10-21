import { ChangeDetectionStrategy, Component, ElementRef, HostBinding, input, OnInit, output, signal, viewChild } from '@angular/core';

@Component({
  selector: 'calculator-button',
  standalone: true,
  imports: [],
  templateUrl: './calculator-button.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrl: './calculator-button.component.css',
  host: {
    class: 'border-r border-b border-indigo-400', //Clases en la etiqueta del propio componente
    '[class.w-1/4]': '!isDoubleSize()', //Se le pone la clase w-1/4 si no tiene el atributo isDoubleSize
    '[class.w-2/4]': 'isDoubleSize()', //Se le pone la clase w-2/4 si tiene el atributo isDoubleSize
  }
})
export class CalculatorButtonComponent {

  public isPressed = signal(false);

  public onClick = output<string>();
  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  public isCommand = input(false, { transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value });

  public isDoubleSize = input(false, { transform: (value: boolean | string) => typeof value === 'string' ? value === '' : value });

  // @HostBinding('class.w-2/4') get commandStyle() {
  //   return this.isDoubleSize();
  // }

  handleClick() {

    if (!this.contentValue()?.nativeElement) {
      return;
    }

    const value = this.contentValue()!.nativeElement.innerText;

    this.onClick.emit(value.trim());

  }

  public keyboardPressedStyle(key: string) {

    if (!this.contentValue()) return;

    const value = this.contentValue()!.nativeElement.innerText;

    if (value !== key) return;

    this.isPressed.set(true);

    setTimeout(() => {
      this.isPressed.set(false);
    }, 100);

  }

}
