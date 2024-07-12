import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const Cart = ({ route, navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function initCartItems() {
      try {
        const storedCartItems = await AsyncStorage.getItem("cartItems");
        if (storedCartItems !== null) {
          setCartItems(JSON.parse(storedCartItems));
        } else if (route.params?.cartItems) {
          setCartItems(route.params.cartItems);
        } else {
          setCartItems([]);
        }
      } catch (error) {
        console.error("Error initializing cart items:", error);
      }
    }
    initCartItems();
  }, [route.params]);

  const fetchApi = async () => {
    setLoading(true);
    try {
      const response = await axios.get("https://fakestoreapi.com/products");
      // Do something with the response data, e.g., display it in a list
    } catch (error) {
      console.error("Error fetching products", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    async function saveCartItems() {
      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(cartItems));
      } catch (error) {
        console.error("Error saving cart items:", error);
      }
    }
    saveCartItems();
  }, [cartItems]);

  const removeItem = useCallback((itemId) => {
    setCartItems((prevCartItems) =>
      prevCartItems.filter((item) => item.id !== itemId)
    );
  }, []);

  const handleCheckout = () => {
    // Add navigation or checkout logic here
    console.log("Checkout clicked!");
  };

  if (loading) {
    return <Text>Loading...</Text>;
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        <View style={styles.header}>
          <View style={styles.headerTextContainer}>
            <Text style={styles.headerText}>Open</Text>
            <Text style={styles.headerTextSub}>Fashion</Text>
          </View>
          <Image
            style={styles.icon}
            source={require("../assets/icons8-search.png")}
          />
        </View>

        <View style={styles.checkoutTextHeader}>
          <Text style={styles.checkOutHeader}>CHECKOUT</Text>
        </View>

        <ScrollView
          style={styles.scrollView}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.cartContainer}>
            {cartItems.length > 0 ? (
              cartItems.map((item, index) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.navigate("Details", { item })}
                >
                  <View style={styles.cartItem}>
                    <View style={styles.cartContainerImg}>
                      <Image
                        style={styles.productImage}
                        source={{ uri: item.image }}
                      />
                    </View>

                    <View style={styles.cartItemText}>
                      <Text style={styles.itemName}>{item.title}</Text>
                      <Text style={styles.itemDescription}>
                        {item.category}
                      </Text>
                      <Text style={styles.itemPrice}>${item.price}</Text>
                    </View>

                    <TouchableOpacity
                      onPress={() => removeItem(item.id)}
                      style={styles.iconContainer}
                    >
                      <Image
                        style={styles.iconCancel}
                        source={require("../assets/cancel.png")}
                      />
                    </TouchableOpacity>
                  </View>
                </TouchableOpacity>
              ))
            ) : (
              <Text style={styles.text}>Your Cart is Empty</Text>
            )}
          </View>
        </ScrollView>

        <View style={styles.checkOutSection}>
          <View style={styles.totalPrice}>
            <Text>EST TOTAL</Text>
            <Text>
              $
              {cartItems
                .reduce((total, item) => total + item.price, 0)
                .toFixed(2)}
            </Text>
          </View>
          <TouchableOpacity
            style={styles.checkOutButton}
            onPress={handleCheckout}
          >
            <Image
              style={styles.iconTint}
              source={require("../assets/shopping-bag.png")}
            />
            <Text style={styles.checkoutText}>Checkout</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  subContainer: {
    flex: 1,
    marginHorizontal: 16,
  },
  header: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginVertical: 16,
    alignItems: "center",
    gap: 135,
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
  icon: {
    width: 24,
    height: 24,
  },
  checkoutTextHeader: {
    alignItems: "center",
    marginVertical: 16,
  },
  checkOutHeader: {
    fontSize: 20,
    fontWeight: "bold",
  },
  scrollView: {
    flex: 1,
  },
  cartContainer: {
    flex: 1,
  },
  cartItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginVertical: 8,
    padding: 8,
    borderRadius: 8,
    borderColor: "#ddd",
  },
  cartContainerImg: {
    width: 150,
    height: 200,
    borderRadius: 8,
    marginRight: 8,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
  },
  productImage: {
    width: 120,
    height: 150,
    borderRadius: 8,
    resizeMode: "contain",
  },
  cartItemText: {
    flex: 1,
    marginHorizontal: 8,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 14,
    color: "#555",
  },
  itemPrice: {
    fontSize: 16,
    color: "#000",
  },
  iconContainer: {
    padding: 4,
  },
  iconCancel: {
    width: 24,
    height: 24,
  },
  checkOutSection: {
    flexDirection: "column",
  },
  totalPrice: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
  },
  checkOutButton: {
    backgroundColor: "black",
    flexDirection: "row",
    padding: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 10,
  },
  iconTint: {
    width: 24,
    height: 24,
    tintColor: "#fff",
  },
  checkoutText: {
    color: "#fff",
    marginLeft: 8,
  },
  text: {
    textAlign: "center",
    marginVertical: 16,
    fontSize: 18,
    padding: 10,
  },
});

export default Cart;
