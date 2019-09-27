import { PmModalSize } from './pm-modal-size';
import { ComponentFactory } from '@angular/core';

export interface PmModalParams {
  factory: ComponentFactory< any>;
  size?: PmModalSize;
  payload?: any;
}
