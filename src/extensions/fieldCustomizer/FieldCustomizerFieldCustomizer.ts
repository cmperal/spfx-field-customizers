import { Log } from '@microsoft/sp-core-library';
import {
  BaseFieldCustomizer,
  IFieldCustomizerCellEventParameters
} from '@microsoft/sp-listview-extensibility';

import * as strings from 'FieldCustomizerFieldCustomizerStrings';
//import styles from './FieldCustomizerFieldCustomizer.module.scss';

/**
 * If your field customizer uses the ClientSideComponentProperties JSON input,
 * it will be deserialized into the BaseExtension.properties object.
 * You can define an interface to describe it.
 */
export interface IFieldCustomizerFieldCustomizerProperties {
  // This is an example; replace with your own property
  sampleText?: string;
}

const LOG_SOURCE: string = 'FieldCustomizerFieldCustomizer';

export default class FieldCustomizerFieldCustomizer
  extends BaseFieldCustomizer<IFieldCustomizerFieldCustomizerProperties> {

  public onInit(): Promise<void> {
    // Add your custom initialization to this method.  The framework will wait
    // for the returned promise to resolve before firing any BaseFieldCustomizer events.
    Log.info(LOG_SOURCE, 'Activated FieldCustomizerFieldCustomizer with properties:');
    Log.info(LOG_SOURCE, JSON.stringify(this.properties, undefined, 2));
    Log.info(LOG_SOURCE, `The following string should be equal: "FieldCustomizerFieldCustomizer" and "${strings.Title}"`);
    return Promise.resolve();
  }

  public onRenderCell(event: IFieldCustomizerCellEventParameters): void {
    const operandA: number = Number(event.listItem.getValueByName('OperandA'));
    const operandB: number = Number(event.listItem.getValueByName('OperandB'));
    
    const result: number = operandA + operandB;

    event.domElement.innerText = `${operandA} + ${operandB} = <strong>${result}</strong>`;
  }

  public onDisposeCell(event: IFieldCustomizerCellEventParameters): void {
    // This method should be used to free any resources that were allocated during rendering.
    // For example, if your onRenderCell() called ReactDOM.render(), then you should
    // call ReactDOM.unmountComponentAtNode() here.
    super.onDisposeCell(event);
  }
}
