import { FormGroup, FormBuilder } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-service-modal',
  templateUrl: './new-service-modal.component.html',
  styleUrls: ['./new-service-modal.component.css']
})
export class NewServiceModalComponent implements OnInit {
  formMain: FormGroup;
  constructor(public bsModalRef: BsModalRef, private fb: FormBuilder, private bsModalService: BsModalService) { }

  ngOnInit(): void {

    this.formMain = this.fb.group({
      id: [null],
      description: [],
      day_pay: [],
      nfse: [],
      initial_date: [],
      final_date: [],
      value: 0,
    });
  }

  closeDialog() {
    this.bsModalService.hide();
  }
 


}
