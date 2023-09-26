import { Directive, ElementRef } from '@angular/core';
import {
  Cartesian3,
  Color,
  Viewer,
  LabelStyle,
  VerticalOrigin,
  Cartesian2,
  PolylineOutlineMaterialProperty,
  SceneMode,
} from 'cesium';

@Directive({
  selector: '[fdsCesiumMap]',
  standalone: true,
})
export class CesiumMapDirective {
  viewer: Viewer;
  // bgInteractive: Color = new Color(77, 172, 255, 1);
  constructor(private el: ElementRef) {
    this.viewer = new Viewer(this.el.nativeElement);
    this.viewer.scene.mode = SceneMode.SCENE2D;
    this.viewer.entities.add({
      position: Cartesian3.fromDegrees(-182, 129),
      point: {
        pixelSize: 5,
        color: Color.WHITE,
        outlineColor: Color.fromCssColorString('#00c7cb'),
        outlineWidth: 2,
      },
    });
    this.viewer.entities.add({
      position: Cartesian3.fromDegrees(-82, 29),
      point: {
        pixelSize: 5,
        color: Color.WHITE,
        outlineColor: Color.fromCssColorString('#00c7cb'),
        outlineWidth: 2,
      },
    });
    this.viewer.entities.add({
      name: 'Sample Satellite Path',
      polyline: {
        positions: Cartesian3.fromDegreesArrayHeights([
          -82, 29, 350000, -182, 129, 350000,
        ]),
        width: 5,
        material: new PolylineOutlineMaterialProperty({
          color: Color.fromCssColorString('#00c7cb'),
          outlineWidth: 2,
          outlineColor: Color.BLACK,
        }),
      },
    });
  }
}
