import React from "react";
import {
  SafeAreaView,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

const Details = ({ navigation, route }) => {
  const { item } = route.params || {}; // Destructure item from route.params

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => navigation.toggleDrawer()}>
            <Image style={styles.icon} source={require("../assets/Menu.png")} />
          </TouchableOpacity>

          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Open</Text>
            <Text style={styles.headerTextSub}>Fashion</Text>
          </View>
          <View style={styles.iconContainer}>
            <TouchableOpacity>
              <Image
                style={styles.icon}
                source={require("../assets/icons8-search.png")}
              />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => navigation.navigate("Cart")}>
              <Image
                style={styles.icon}
                source={require("../assets/shopping-bag.png")}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Render the item details */}
        <View style={styles.detailsContainer}>
          <View style={styles.imgContainer}>
            <Image style={styles.productImage} source={{ uri: item?.image }} />
          </View>

          <Text>{item?.title}</Text>
          <Text>{item?.category}</Text>
          <Text>{item?.description}</Text>
          <Text style={styles.itemPrice}>${item?.price}</Text>
          <View style={styles.infoConatiner}>
            <View style={styles.info}>
              <Image
                style={styles.icon}
                source={require("../assets/icons/icons8-no-bleach-32.png")}
              />
              <Text>Do not use bleach</Text>
            </View>
            <View style={styles.info}>
              <Image
                style={styles.icon}
                source={require("../assets/icons/icons8-do-not-tumble-dry-80.png")}
              />
              <Text>Do not tumble dry</Text>
            </View>

            <View style={styles.info}>
              <Image
                style={styles.icon}
                source={require("../assets/icons/icons8-wash-basin-64.png")}
              />
              <Text>Dry clean with tetrachloroethylene</Text>
            </View>

            <View style={styles.info}>
              <Image
                style={styles.icon}
                source={require("../assets/icons/icons8-ironing-100.png")}
              />
              <Text>Iron at a maximum of 110oC/230oF</Text>
            </View>
          </View>
          <View style={styles.hr} />

          <View style={styles.delivery}>
            <View style={styles.deliveryContainer}>
              <Image
                style={styles.icon}
                source={require("../assets/icons/icons8-delivery-van-100.png")}
              />
              <View style={styles.deliveryText}>
                <Text>Free Flat Rate Shipping</Text>
                <Text>Estimated to be delivered on</Text>
                <Text>09/11/2021 - 12/11/2021.</Text>
              </View>
            </View>
            <View>
              <Image
                style={styles.icon}
                source={require("../assets/icons/icons8-collapse-arrow-96.png")}
              />
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Details;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    padding: 10,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  icon: {
    width: 20,
    height: 20,
  },
  headerTextContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  headerTextSub: {
    fontSize: 24,
    fontWeight: "300",
    marginLeft: 4,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 20,
  },
  productImage: {
    width: 200,
    height: 250,
    resizeMode: "contain",
    alignSelf: "center",
    marginVertical: 20,
  },
  detailsContainer: {
    justifyContent: "center",
    alignItems: "start",
    gap: 20,
  },
  imgContainer: {
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    backgroundColor: "white",
    borderRadius: 20,
    marginTop: 10,
  },
  hr: {
    borderBottomWidth: 1,
    width: "90%",
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    borderColor: "gray",
  },
  itemPrice: {
    color: "red",
  },
  delivery: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },
  deliveryContainer: {
    flexDirection: "row",
    alignItems: "start",
    gap: 10,
    padding: 10,
    borderRadius: 10,
    borderColor: "gray",
    borderWidth: 1,
    backgroundColor: "white",
    justifyContent: "center",
  },
  deliveryText: {
    flexDirection: "column",
    alignItems: "start",
    gap: 10,
  },
  info: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  infoConatiner: {
    flexDirection: "column",
    alignItems: "start",
    gap: 10,
  },
});
