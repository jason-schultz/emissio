import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivityService } from '../../../core/services/activity.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { InputFieldComponent } from '../../../shared/components/input-field/input-field.component';
import { ButtonComponent } from '../../../shared/components/button/button.component';
import { PageHeaderComponent } from '../../../shared/components/page-header/page-header.component';

@Component({
  selector: 'app-activity-form',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    InputFieldComponent,
    ButtonComponent,
    PageHeaderComponent
  ],
  templateUrl: './activity-form.component.html',
  styleUrl: './activity-form.component.css'
})
export class ActivityFormComponent implements OnInit {
  form = new FormGroup({
    type: new FormControl<string>('', { nonNullable: true, validators: [Validators.required] }),
    co2e: new FormControl<number>(0, { nonNullable: true, validators: [Validators.min(0)] }),
  });

  id?: number;
  submitting = false;
  error?: string;

  constructor(
    private activityService: ActivityService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    const param = this.route.snapshot.paramMap.get('id');
    if (param) {
      this.id = +param;
      this.activityService.getActivityById(this.id).subscribe((activity) => {
        this.form.patchValue({
          type: activity.type,
          co2e: activity.co2e
        });
      }
      );
    }
  }

  onSubmit() {
    if (this.form.invalid) return;

    const { type, co2e } = this.form.value;

    if (type === undefined || co2e === undefined) {
      this.error = 'Type and CO2e are required';
      this.submitting = false;
      return;
    }

    this.submitting = true;
    this.error = undefined;

    const obs = this.id
      ? this.activityService.updateActivity(this.id, { type, co2e })
      : this.activityService.createActivity({ type, co2e });

    obs.subscribe(() => this.router.navigate(['/activities']));
  }
}