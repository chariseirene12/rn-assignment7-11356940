import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

const ProductItem = React.memo(({ item, addItem }) => (
  <TouchableOpacity onPress={() => addItem(item)}>
    <View style={styles.productContainer}>
      <View style={styles.productContainerImg}>
        <Image style={styles.productImage} source={{ uri: item.image }} />
        <Image style={styles.iconAdd} source={require("../assets/add.png")} />
      </View>
      <View style={styles.itemName}>
        <Text style={styles.itemName}>{item.name}</Text>
      </View>
      <View>
        <Text style={styles.itemDescription}>{item.category}</Text>
        <Text style={styles.itemPrice}>${item.price}</Text>
      </View>
    </View>
  </TouchableOpacity>
));

const Home = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [numColumns, setNumColumns] = useState(2);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function getCartItems() {
      try {
        const storedCartItems = await AsyncStorage.getItem("cartItems");
        if (storedCartItems !== null) {
          setCartItems(JSON.parse(storedCartItems));
        }
      } catch (error) {
        console.log(error);
      }
    }
    getCartItems();
  }, []);

  useEffect(() => {
    async function saveCartItems() {
      try {
        await AsyncStorage.setItem("cartItems", JSON.stringify(cartItems));
      } catch (error) {
        console.log(error);
      }
    }
    saveCartItems();
  }, [cartItems]);

  useEffect(() => {
    const fetchApi = async () => {
      setLoading(true);
      try {
        const response = await axios.get("https://fakestoreapi.com/products");
        setCartItems(response.data);
      } catch (error) {
        console.error("Error fetching products", error);
      } finally {
        setLoading(false);
      }
    };
    fetchApi();
  }, []);

  const addItem = useCallback((item) => {
    setCartItems((prevCartItems) => {
      const itemExists = prevCartItems.some(
        (cartItem) => cartItem.id === item.id
      );
      if (!itemExists) {
        return [...prevCartItems, item];
      }
      return prevCartItems;
    });
  }, []);

  const removeItem = useCallback((itemId) => {
    setCartItems((prevCartItems) => {
      return prevCartItems.filter((item) => item.id !== itemId);
    });
  }, []);

  const renderItem = useCallback(
    ({ item }) => <ProductItem item={item} addItem={addItem} />,
    [addItem]
  );

  useEffect(() => {
    navigation.setOptions({
      removeItem,
    });
  }, [navigation, removeItem]);

  if (loading) {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.loading}>Loading...</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.subContainer}>
        {/* header */}
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
            <TouchableOpacity
              onPress={() => navigation.navigate("Cart", { cartItems })}
            >
              <Image
                style={styles.icon}
                source={require("../assets/shopping-bag.png")}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* story */}
        <View style={styles.story}>
          <Text style={styles.storyText}>OUR STORY</Text>
          <View style={styles.iconContainer}>
            <Image
              style={styles.icon}
              source={require("../assets/Listview.png")}
            />
            <Image
              style={styles.icon}
              source={require("../assets/Filter.png")}
            />
          </View>
        </View>

        {/* products */}
        <View style={styles.products}>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.id.toString()}
            renderItem={renderItem}
            columnWrapperStyle={styles.columnWrapper}
            numColumns={numColumns}
            showsVerticalScrollIndicator={false}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    padding: 10,
    gap: 40,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerTextContainer: {
    flexDirection: "column",
    alignItems: "center",
  },
  story: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  headerText: {
    fontWeight: "bold",
    fontSize: 18,
  },
  headerTextSub: {
    fontWeight: "bold",
    fontSize: 18,
    top: -9,
  },
  storyText: {
    fontSize: 20,
  },
  iconContainer: {
    flexDirection: "row",
    gap: 20,
  },
  icon: {
    width: 26,
    height: 26,
  },
  columnWrapper: {
    justifyContent: "space-between",
    marginBottom: 10, // Optional: to add space between rows
  },
  productContainer: {
    justifyContent: "center",
    gap: 10,
    flex: 1,
    marginBottom: 20,
  },
  productContainerImg: {
    position: "relative",
    alignItems: "center",
    justifyContent: "center",
    gap: 10,
    backgroundColor: "white",
    height: 300,
    width: 200,
  },
  productImage: {
    width: 150,
    height: 300,
    resizeMode: "center",
    backgroundColor: "white",
  },
  itemPrice: {
    color: "red",
  },
  products: {
    height: 700,
  },
  iconAdd: {
    height: 26,
    width: 26,
    position: "absolute",
    bottom: 4,
    right: 5,
  },
  itemName: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 5,
  },
  itemDescription: {
    fontSize: 14,
    marginBottom: 5,
  },
  loading: {
    flex: 1,
    justifyContent: "center",
    alignContent: "center",
  },
});
