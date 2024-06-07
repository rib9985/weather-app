import { uiLogic } from './UI';
import Validate from './Validation';

uiLogic.buttonUnitsChange();
Validate.addListeners();
const previousWeatherRequestValidate = Validate.submitForm();
