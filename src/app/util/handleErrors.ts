

export function handleLoginError(error: any) {
    let errorMessage = 'Ocurrió un error durante el inicio de sesión. Por favor, inténtalo de nuevo más tarde.';
    
    if (!error.status) {
      switch (error.message) {
        case 'USER_NOT_FOUND':
          errorMessage = 'No se encontró un usuario con ese documento de identidad.';
          break;
        case 'PASSWORD_INCORRECT':
          errorMessage = 'Contraseña incorrecta. Por favor, inténtalo de nuevo.';
          break;
        case 'auth/network-request-failed':
          errorMessage = 'Error de red. Por favor, verifica tu conexión a internet.';
          break;
        // Agrega más casos según necesites para manejar otros errores específicos de inicio de sesión
        default:
          break;
      }
    }
    return errorMessage;
  }