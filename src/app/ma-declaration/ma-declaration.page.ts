import { Component, OnInit } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';
import { Capacitor } from '@capacitor/core';
import { Geolocation } from '@capacitor/geolocation';
import { NativeGeocoder, NativeGeocoderResult, NativeGeocoderOptions } from '@awesome-cordova-plugins/native-geocoder/ngx';



@Component({
  selector: 'app-ma-declaration',
  templateUrl: './ma-declaration.page.html',
  styleUrls: ['./ma-declaration.page.scss'],
})
export class MaDeclarationPage implements OnInit {
  selectedImage : any = 'https://via.placeholder.com/150';
  
    options : NativeGeocoderOptions ={
      useLocale: true,
      maxResults: 5
    } 
    geoAddress:any;
  constructor(
    private nativegeocoder : NativeGeocoder
  ) { }

  checkPlatformForWeb() {
    if(Capacitor.getPlatform() == 'web' || Capacitor.getPlatform() == 'ios') return true;
    return false;
  }


   async takePicture() {
    const image = await Camera.getPhoto({
      quality: 90,
      source : CameraSource.Camera ,
      //width : 600,
      resultType: this.checkPlatformForWeb() ? CameraResultType.DataUrl : CameraResultType.Uri
    });
    console.log('image: ', image);
    this.selectedImage = image;
    if(this.checkPlatformForWeb()) this.selectedImage.webPath = image.dataUrl;
   
  };



  async fetchLocation(){
          const location = await Geolocation.getCurrentPosition();
          console.log('location =', location); 

          this.nativegeocoder.reverseGeocode(location.coords.latitude, location.coords.longitude , this.options).then(
            (
              result: NativeGeocoderResult[]) =>{
                console.log('result= ', result);
                console.log('result 0 = ', result[0]);

                this.geoAddress =this.generateAddress(result[0]);
                console.log('location address = ', this.geoAddress);
              }
          )
  }





    //Return Comma saperated address
    generateAddress(addressObj: { [x: string]: any; }){
      let obj: any[] = [];
      let uniqueNames: any[] = [];
      let address = "";
      for (let key in addressObj) {
  
  
        // console.log(addressObj[key]);
  
        if( key!='areasOfInterest' ){
          obj.push(addressObj[key]);
        }
  
  
      }
  
      var i = 0;
      obj.forEach(value=>{
  
        // console.log('new foreach value:', obj[i]);
  
        if( uniqueNames.indexOf(obj[i]) === -1 ){
          uniqueNames.push(obj[i]);
        }
  
        i++;
      });
  
  
      uniqueNames.reverse();
      for (let val in uniqueNames) {
        if(uniqueNames[val].length)
        address += uniqueNames[val]+', ';
      }
  
  
  
      return address.slice(0, -2);
    }




  ngOnInit() {
  }

}
