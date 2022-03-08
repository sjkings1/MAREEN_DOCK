// import * as React from 'react';
// import FormControlLabel from '@mui/material/FormControlLabel';
// import Switch from '@mui/material/Switch';
// import FormGroup from '@mui/material/FormGroup';
// import Stack from '@mui/material/Stack';
// import Typography from '@mui/material/Typography';
// import { blue, red } from '@mui/material/colors';





// export default function LoadingButtonsTransition(props) {
//     const [loading, setLoading] = React.useState(true);

//     return (

//         <FormGroup>

//             <Stack direction="row" spacing={1} alignItems="center">

//                 <Typography> <h5> CELSIUS(°C) </h5> </Typography>

//                 <FormControlLabel
//                     sx={{ display: 'block' }}
//                     control={

//                         <Switch
//                             checked={loading}
//                             onChange={() => {
//                                 setLoading(!loading);
//                                 props.toggleProp(!props.currentStatusOfToggle);
//                             }}
//                             backgroundColor={red}
//                             name="loading"
//                             color="secondary"
//                         />
//                     }

//                     label=""
//                 />

//                 <Typography> <h5> FAHRENHEIT(°F) </h5> </Typography>

//             </Stack>

//         </FormGroup>
//     );
// }

import * as React from 'react';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';

export default function ColorToggleButton(props) {
    const [alignment, setAlignment] = React.useState('android');
    const [loading, setLoading] = React.useState(true);

    const handleChange = (event, newAlignment) => {
        setAlignment(newAlignment);
        setLoading(!loading);
        props.toggleProp(!props.currentStatusOfToggle);


    };

    return (
        <ToggleButtonGroup
            color="secondary"
            value={alignment}
            exclusive
            onChange={handleChange}
        >
            <ToggleButton value="android"> <h5> CELSIUS(°C) </h5> </ToggleButton>
            <ToggleButton value="web"> <h5> FAHRENHEIT(°F) </h5> </ToggleButton>
            
        </ToggleButtonGroup>
    );
}
