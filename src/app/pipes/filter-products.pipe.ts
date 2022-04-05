import { Pipe, PipeTransform } from '@angular/core';
//I use decarador pipe to perform a filter on the corresponding array
@Pipe({
  name: 'filterProducts'
})
export class FilterProductsPipe implements PipeTransform {

  //in the transform I receive the values ​​as an array and filter them according to the field
  transform(value: any[], field:string, ...args: any[]): any[] {
    if(!value){
      return null
    }
    if(!args){
      return value;
    }

    return value.filter(singleItem =>
      singleItem[field].toLowerCase().includes(args)
    )
  }

}
