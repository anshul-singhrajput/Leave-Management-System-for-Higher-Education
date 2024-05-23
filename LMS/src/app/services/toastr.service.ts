import { Injectable } from '@angular/core';
import { ToastrService as Toastr } from "ngx-toastr";


@Injectable({
  providedIn: 'root'
})
export class ToastrService {

  constructor(
    private _toastr: Toastr
  ) { }

  success(message = "Success") {
    this._toastr.success(message, "Success!");
  }

  warning(message = "Warning") {
    this._toastr.warning(message, "Warning!");
  }

  error(message = "Error") {
    this._toastr.error(message, "Error!");
  }

  info(message = "Info") {
    this._toastr.info(message, "Info!");
  }

}
