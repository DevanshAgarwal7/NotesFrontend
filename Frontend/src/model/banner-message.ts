import Swal from "sweetalert2";

export class BannerMessage {

    public getSuccessMessage(title: string){
        const Toast = Swal.mixin({
            toast: true,
            position: "top-end",
            width: 300,
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.onmouseenter = Swal.stopTimer;
              toast.onmouseleave = Swal.resumeTimer;
            }
          });
          Toast.fire({
            icon: "success",
            title: title
          });
    }

    public getConfirmation(){
        const swalWithBootstrapButtons = Swal.mixin({
            customClass: {
              confirmButton: "btn btn-success",
              cancelButton: "btn btn-danger"
            },
            buttonsStyling: false
          });
          swalWithBootstrapButtons.fire({
            title: "Are you sure?",
            text: "The Details you give are Correct ?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonText: "Confirm",
            cancelButtonText: "Change",
            reverseButtons: true
          })
    }

    public showError(text: string){
        Swal.fire({
          position: "center",
          icon: "error",
          text: text,
          color: "red",
          showConfirmButton: false,
          timer: 3000,
          timerProgressBar: true
        });
      }
}
