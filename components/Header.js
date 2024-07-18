import {Text} from 'react-native';

function Header({name, color}) {

    return(
        <Text style={{color:color}}>{name}</Text>
    )
}

export default Header;