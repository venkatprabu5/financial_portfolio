import { Component, OnInit } from '@angular/core';
import { ChartData, ChartOptions } from 'chart.js';
import { CommonService } from '../service/common.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent implements OnInit {

  assetValues: any[] = [];
  quantities: any;
  netWorth: any;
  monthsdata: any[] = [];

  constructor(private commonService: CommonService) {

    this.commonService.chartValues.subscribe(data => {
      console.log(data, "Behaviour subject data");

      const predefinedAssets = ['Equity', 'Gold', 'Bond', 'Real Estate'];

      // First, group by assetType and sum the quantity and purchasePrice
      const groupedData = data.reduce((acc: any, current: any) => {
        const existingAsset = acc.find((item: any) => item.assetType.toLowerCase() === current.assetType.toLowerCase());

        if (existingAsset) {
          existingAsset.quantity += current.quantity;
          existingAsset.purchasePrice += current.purchasePrice;
        } else {
          acc.push({
            assetType: current.assetType,
            purchasePrice: current.purchasePrice,
            quantity: current.quantity
          });
        }
        return acc;
      }, []);


      const result = predefinedAssets.map(assetType => {
        const existingAsset = groupedData.find((item: any) => item.assetType.toLowerCase() === assetType.toLowerCase());

        if (existingAsset) {
          return {
            assetType: assetType, // Maintain the casing from predefinedAssets
            purchasePrice: existingAsset.purchasePrice,
            quantity: existingAsset.quantity
          };
        } else {
          // If the assetType doesn't exist, return it with purchasePrice and quantity as 0
          return {
            assetType: assetType,
            purchasePrice: 0,
            quantity: 0
          };
        }
      });

      console.log(result);
      this.assetValues = result;
      this.quantities = this.assetValues.map(item => item.quantity);
      console.log(this.quantities);
      this.netWorth = this.assetValues.map(item => item.purchasePrice).reduce((acc, price) => acc + price, 0);

      const predefinedMonths = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

      let currentValue = this.netWorth;
      predefinedMonths.forEach(month => {
        this.monthsdata.push(Math.round(currentValue));
        let randomPercentage = Math.random() * 0.05;
        currentValue *= (1 + randomPercentage);
      })
      console.log(this.monthsdata, "monthsdata");
    })
  }

  ngOnInit(): void {
    this.initializeChartData();
  }

  //lineChart
  lineChartData: ChartData<'line'> = {
    labels: [], // Initialize with empty arrays or default values
    datasets: []
  };
  lineChartOptions: ChartOptions<'line'> = {
    responsive: true
  };
  lineChartType: 'line' = 'line';

  //DonutChart
  doughnutChartData: ChartData<'doughnut'> = {
    labels: [], // Initialize with empty arrays or default values
    datasets: []
  } // Use ChartData directly
  doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true
  };
  doughnutChartType: 'doughnut' = 'doughnut';

  initializeChartData() {
    this.lineChartData = {
      labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
      datasets: [
        {
          label: 'Earnings in ₹',
          data: this.monthsdata,
          backgroundColor: 'rgba(85,85,85, 1)',
          borderColor: 'rgb(41, 155, 99)',
          borderWidth: 1
        }
      ]
    };

    this.doughnutChartData = {
      labels: ['Equity', 'Gold', 'Bond', 'Real Estate'],
      datasets: [
        {
          label: 'Asset Allocation',
          data: this.quantities,
          backgroundColor: [
            'rgba(41, 155, 99, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(120, 46, 139,1)'

          ],
          borderColor: [
            'rgba(41, 155, 99, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(120, 46, 139,1)'

          ],
          borderWidth: 1
        }
      ]
    };

  }

}
