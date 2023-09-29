import { Directive, ElementRef } from '@angular/core';
import { OnInit } from '@angular/core';
import {
  Cartesian3,
  Color,
  Viewer,
  LabelStyle,
  VerticalOrigin,
  Cartesian2,
  PolylineOutlineMaterialProperty,
  SceneMode,
  ProviderViewModel,
} from 'cesium';

@Directive({
  selector: '[fdsCesiumMap]',
  standalone: true,
})
export class CesiumMapDirective implements OnInit {
  viewer: Viewer;
  // bgInteractive: Color = new Color(77, 172, 255, 1);
  constructor(private el: ElementRef) {
    this.viewer = new Viewer(this.el.nativeElement);
    this.viewer.scene.mode = SceneMode.SCENE2D;

    //TODO: figure out how to set the default baseLayerPicker to be Natural Earth II
    this.viewer.entities.add({
      position: Cartesian3.fromDegrees(-182, 129),
      point: {
        pixelSize: 5,
        color: Color.fromCssColorString('#1b2d3e'),
        outlineColor: Color.fromCssColorString('#00c7cb'),
        outlineWidth: 2,
      },
    });
    this.viewer.entities.add({
      position: Cartesian3.fromDegrees(-82, 29),
      point: {
        pixelSize: 5,
        color: Color.fromCssColorString('#1b2d3e'),
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
  ngOnInit(): void {
    this.viewer.camera.zoomOut(19000000);

    // this.viewer.baseLayerPicker.viewModel.selectedImagery.name =
    //   'Natrual Earth II';
    console.log(this.viewer.imageryLayers);
  }
}
