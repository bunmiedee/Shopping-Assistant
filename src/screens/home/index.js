import React, { Component } from 'react';
import {
  StyleSheet,
  ActivityIndicator,
  ScrollView,
  View,
  Text,
  FlatList,
  Image,
  Platform,
  LayoutAnimation,
  TouchableOpacity,
  Dimensions,
  Keyboard
} from 'react-native';

import {
  getStatusBarHeight,
  getBottomSpace
} from 'react-native-iphone-x-helper';

import _ from 'lodash';

import { connect } from 'react-redux';

import GlobalStyles from 'src/style/global-styles';

import { Badge } from 'react-native-elements';

import { LOGO } from 'src/constants';
import { LOGIN_SUCCESS } from 'src/actions/auth/constants';

import * as AuthService from 'api/auth-service';

import { Constants, Svg } from 'expo';

import { SearchBox, AppBackdrop, LocationButton, MapView } from 'src/components/commons';

import dataProvider from 'src/data.json';


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchString: '',
      selectedItem: {},
      suggestions: [],
      showMap: false
    }
  }


  componentDidUpdate() {
    LayoutAnimation.configureNext(LayoutAnimation.create(
      200,
      LayoutAnimation.Types['linear'],
      LayoutAnimation.Properties.opacity
    ));
  }

  getSuggestions = (text) => {
    const suggestions = _.uniqBy(
      _.filter(dataProvider, dataItem => {
        const { brand, tags: _tags, category } = dataItem;
        const toCompare = text.toLowerCase();

        const brandContainsText = _.includes( brand.toLowerCase(), toCompare);
        const catContainsText = _.includes( category.toLowerCase(), toCompare);
        const tags = _tags.join(' ');
        const tagsContainText = _.includes( tags.toLowerCase(), toCompare);

        return brandContainsText || catContainsText || tagsContainText;
    }), item => item.sku
  );

    this.setState({
      searchString: text,
      suggestions,
      selectedItem: {},
      relatedItems: []
    });
  }

  onSelect = (item) => {
    Keyboard.dismiss();
    const { product } = item;

    this.setState({
      searchString: product,
      selectedItem: item,
      suggestions: []
    });


    this.getRelatedItems(item);
  }

  getRelatedItems = (item) => {
    // Show on the top of related items, the items in same category first
    // and then items related by tag.
    const { tags, category, sku } = item;
    const sameCategoryItems = _.filter(dataProvider,
      dataItem => {
        const { category: itemCategory, sku: itemSku } = dataItem;
        return category === itemCategory && sku !== itemSku;
      });

    const sameTagsItems = _.filter(dataProvider,
      dataItem => {
        const { tags: itemTags, category: itemCategory } = dataItem;
        const intersect = _.intersection(tags, itemTags);
        return intersect.length > 0 && category !== itemCategory;
      });

    const relatedItems = _.uniqBy(
      _.concat(sameCategoryItems, sameTagsItems),
      item => item.sku
    );

    this.setState({
      relatedItems
    })
  }


  clearInput = () => {
    this.setState({
      searchString: '',
      selectedItem: {},
      suggestions: [],
      relatedItems: []
    });

    this.searchBox.focus();
  }

  showMapView = () => {
    Keyboard.dismiss();
    this.setState({
      showMap: true
    });
  }

  hideMapView = () => {
    this.setState({
      showMap: false
    });
  }

  render() {
    const offset = getStatusBarHeight();
    const {
      suggestions,
      selectedItem,
      relatedItems,
      searchString,
      showMap
    } = this.state;

    return (
      <ScrollView
        keyboardShouldPersistTaps={'always'}
        scrollEnabled={false}
        contentContainerStyle={[GlobalStyles.mainContainer, {backgroundColor:'#000'}]}>
        <AppBackdrop
        />

        <View style={[
          GlobalStyles.headerContainer,
          {width:'100%', paddingHorizontal:15}
        ]}>
          <View
            style={{width:'100%', paddingTop: offset, alignItems:'center'}}>
            <Image
              source={LOGO}
              style={{width:146, height:26}}
            />
          </View>

          <View style={{width: '100%', padding: 10, alignItems: 'center'}}>
            <SearchBox
              placeholder={'Search for item'}
              suggestions={suggestions}
              value={searchString}
              onChangeText={(text) => this.getSuggestions(text) }
              clearInput={this.clearInput}
              onSelect={this.onSelect}
              otherProps={{ref: (comp) => this.searchBox = comp}}
              />
          </View>

        </View>

        {/* location btn*/}
        {
          !_.isEmpty(selectedItem) &&
          <View style={{width:'100%', paddingHorizontal:25}}>
            <Text style={[GlobalStyles.subHeader, {fontSize:14, textAlign:'center'}]}>Location</Text>

            <LocationButton
              onPress={this.showMapView}
              resultLocation={selectedItem.location}
            />
          </View>
        }

        {/* related list*/}
        {
          !_.isEmpty(relatedItems) &&
          <View style={{ marginTop: 15, width: '100%', height: 510 + getBottomSpace(), paddingBottom: 50, backgroundColor: '#00284098' }}>
            <Text
              style={[GlobalStyles.subHeader, { fontSize: 14, marginTop: 10, textAlign: 'center' }]}>Related Items
            </Text>

            <FlatList
              style={{ marginTop: 15 }}
              data={relatedItems}
              keyExtractor={item => item.sku.toString()}
              renderItem={({ item, index }) =>
                <TouchableOpacity
                  onPress={() => this.onSelect(item)}
                  style={[GlobalStyles.relatedItem]}>

                  <View style={{ flexDirection: 'row', justifyContent: 'space-between', paddingRight: 10, alignItems: 'center' }}>
                    <View style={{ marginVertical: 10, maxWidth: '60%' }}>
                      <Text
                        style={[GlobalStyles.headerSubTitle, { fontSize: 15 }]}>{item.product} - ${item[`unit price`].toFixed(2)}
                      </Text>
                    </View>

                    {
                      item.saleDiscount > 0 &&
                      <Badge
                        containerStyle={{ backgroundColor: '#7c9e10' }}
                        value={`${item.saleDiscount * 100}% discount`}
                        textStyle={[GlobalStyles.badgeLabel]}
                      />
                    }

                  </View>

                  <View style={{ width: '100%', height: 0.7, backgroundColor: '#32688880', marginTop: 10 }} />
                </TouchableOpacity>
              }
            />
          </View>
        }

        {
          showMap &&
          <Text
            onPress={this.hideMapView}
            style={{width:'100%', height: '100%', backgroundColor:'#00000099', position:'absolute'}}
          />
        }

        {/*map view*/}
        <MapView
          show={showMap}
          onClose={this.hideMapView}
        />


      </ScrollView>
    )

  }
}


const bindActions = dispatch => ({
  onLoginSuccess(data) {
    dispatch({type: LOGIN_SUCCESS, data});
  }
});


export default connect( null, bindActions )( Login );
