import { DrawerItems, SafeAreaView, ScrollView } from 'react-navigation';
import {View, StyleSheet, Image } from 'react-native';
import Logo from '../Assets/Logo.png';

const CustomeDrawerNav = props => (
  <ScrollView>
    <SafeAreaView style={styles.container} forceInset={{ top: 'always', horizontal: 'never' }}>
        <View style={styles.customDraw}>
            <Image source={Logo} style={styles.image}/>
        </View>
      <DrawerItems {...props} />
    </SafeAreaView>
  </ScrollView>
);

/*********************************Stylesheet Start*********************************/
const styles = StyleSheet.create({
  container: {
    flex: 1,
  }, customDraw: {
      height: 150,
      backgroundColor: 'white',
      alignItems: 'center'
  }, image:{
      height: 120,
      width: 120
  }
});
/*********************************Stylesheet End*********************************/

export default CustomeDrawerNav;