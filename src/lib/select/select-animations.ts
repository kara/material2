import {
  style,
  animate,
  transition,
  state,
  trigger,
  group,
  AnimationEntryMetadata
} from '@angular/core';

export const swiftEaseInTiming = 'cubic-bezier(0.55, 0, 0.55, 0.2)';
export const swiftEaseOutTiming = 'cubic-bezier(0.25, 0.8, 0.25, 1)';

const panelOffsetX = '-16px';
const panelOffsetY = '-40px';
const panelWidthOffset = '32px';

const floatingOffsetX = '-2px';
const floatingOffsetY = '-22px';
const floatingScale = '0.75';

export class MdSelectAnimations {
  static transformLabel(): AnimationEntryMetadata {
    return trigger('transformLabel', [
      state('normal', style({
        transform: 'translate3d(0, 0, 0) scale(1.0)',
      })),
      state('floating', style({
        position: 'absolute',
        transform: `translate3d(${floatingOffsetX},${floatingOffsetY}, 0) scale(${floatingScale})`
      })),
      transition('* => *', animate(`400ms ${swiftEaseOutTiming}`))
    ]);
  }

  static transformPanel(): AnimationEntryMetadata {
    return trigger('transformPanel', [
      state('in', style({
        opacity: 1,
        transform: `translate3d(${panelOffsetX}, ${panelOffsetY}, 0) scaleY(1.0)`,
        width: `calc(100% + ${panelWidthOffset})`
      })),
      transition('void => *', [
        style({
          opacity: 0,
          transform: 'translate3d(0, 0, 0) scaleY(0)',
          width: '100%'
        }),
        group([
          animate(`150ms ${swiftEaseOutTiming}`, style({
            transform: `translate3d(${panelOffsetX}, ${panelOffsetY}, 0) scaleY(1.0)`,
            width: `calc(100% + ${panelWidthOffset})`
          })),
          animate(`150ms linear`, style({opacity: 1}))
        ])
      ]),
      transition('* => void', [
        style({ opacity: 1}),
        animate(`250ms ${swiftEaseInTiming}`, style({opacity: 0}))
      ])
    ]);
  }

  static fadeInOptions(): AnimationEntryMetadata {
    return trigger('fadeInOptions', [
      state('in', style({ opacity: 1 })),
      transition('void => *', [
        style({ opacity: 0}),
        animate(`150ms 100ms ${swiftEaseInTiming}`)
      ])
    ]);
  }
}

