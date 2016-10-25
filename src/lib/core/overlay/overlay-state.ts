import {PositionStrategy} from './position/position-strategy';


/**
 * OverlayState is a bag of values for either the initial configuration or current state of an
 * overlay.
 */
export class OverlayState {
  /** Strategy with which to position the overlay. */
  positionStrategy: PositionStrategy;

  /** Whether the overlay has a backdrop. */
  hasBackdrop: boolean = false;

  /** Custom class to add to the backdrop **/
  backdropClass: string = 'md-overlay-dark-backdrop';

  /** The width of the overlay panel **/
  width: number | string;

  /** The height of the overlay panel **/
  height: number | string;

  // TODO(jelbourn): configuration still to add
  // - focus trap
  // - disable pointer events
  // - z-index
}
