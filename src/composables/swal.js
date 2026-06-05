import Swal from 'sweetalert2'

export function useSwal() {
  const showAlert = async (options) => {
    await Swal.fire(options)
  }

  const showSuccess = async (message) => {
    return await showAlert({
      position: 'center',
      icon: 'success',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    })
  }

  const showError = async (message) => {
    return await showAlert({
      position: 'center',
      icon: 'error',
      title: message,
      showConfirmButton: false,
      timer: 1500,
    })
  }

  const showConfirmation = async (message) => {
    return await Swal.fire({
      title: 'Are you sure?',
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!',
    })
  }

  return {
    showAlert,
    showSuccess,
    showError,
    showConfirmation,
  }
}
