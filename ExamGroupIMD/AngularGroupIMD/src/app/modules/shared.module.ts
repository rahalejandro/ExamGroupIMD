import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { ConvertTimeCodeClipsPipe } from '../shared/convert-timecode-clips.pipe';
import { ConvertToTimeCodePipe } from '../shared/convert-to-timecode.pipe';

@NgModule({
    imports: [
      CommonModule
    ],
    declarations: [
      ConvertTimeCodeClipsPipe,
      ConvertToTimeCodePipe
    ],
    exports: [
      CommonModule,
      FormsModule,
      ConvertTimeCodeClipsPipe,
      ConvertToTimeCodePipe
    ]
  })

  export class SharedModule { }