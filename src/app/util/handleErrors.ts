

export function handleError(error: any) {
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
        case 'HASH_NOT_MATCH':
          errorMessage = "🔒 La verificación ha fallado. El código de seguridad no coincide. Por favor, inténtalo nuevamente.";
        break;
      case 'PASSWORDS_NOT_MATCH':
        errorMessage = "🔑 Las contraseñas no coinciden. Por favor, verifica e inténtalo de nuevo.";
        break;
      
      case 'PASSWORD_ALREADY_USED':
        errorMessage = "🔒 La contraseña que has ingresado ya ha sido utilizada anteriormente. Por favor, elige una nueva contraseña.";
        break;

      case 'PASSWORD_CHANGE_FAILED':
        errorMessage = "⚠️ No se pudo cambiar la contraseña. Por favor, intenta nuevamente más tarde.";
        break;

       
  
          case 'CURRENT_PASSWORD_INCORRECT':
            errorMessage = "La contraseña actual es incorrecta. 🔒❌ Por favor, verifica e ingrésala nuevamente.";
          break;
        default:
          errorMessage = '¡Oh, no! 😔 Algo salió mal de manera inesperada. Por favor, vuelve a intentarlo en unos momentos.';
          break;
      }
    }
    return errorMessage;
  }