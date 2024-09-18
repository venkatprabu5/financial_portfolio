import { Component } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-investment',
  templateUrl: './investment.component.html',
  styleUrl: './investment.component.scss'
})
export class InvestmentComponent {

  today: string;

  constructor(private commonService: CommonService) {
    const currentDate = new Date();
    currentDate.setDate(currentDate.getDate() + 1);
    this.today = currentDate.toISOString().split('T')[0];
  }
  investmentGroup: FormGroup = new FormGroup({
    assetType: new FormControl("", Validators.required),
    quantity: new FormControl("", [Validators.required, Validators.pattern("^[0-9]+$")]),
    purchasePrice: new FormControl("", [Validators.required, Validators.pattern("^[0-9]+(\\.[0-9]+)?$")]),
    purchaseDate: new FormControl("", Validators.required),
  });

  saveInvestment() {
    this.commonService.assetValues.push(this.investmentGroup.value);
    console.log("Investments", this.commonService.assetValues);
    this.investmentGroup.reset({
      assetType: '',        // Default value for assetType
      quantity: '',         // Default value for quantity
      purchasePrice: '',    // Default value for purchasePrice
      purchaseDate: ''      // Default value for purchaseDate
    });
  }

}
