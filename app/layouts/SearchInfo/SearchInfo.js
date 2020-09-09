
import React, { Component } from 'react'
import {
  NativeModules,
  LayoutAnimation,
  Text,
  TouchableOpacity,
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  StatusBar,
  Image,
  ActivityIndicator,
  Picker,
  ScrollView,
  Alert
} from 'react-native';
import { showMessage } from 'react-native-flash-message';
import Icon from 'react-native-vector-icons/Ionicons'
const height = Dimensions.get('window').height
import {Actions} from 'react-native-router-flux';
const width = Dimensions.get('window').width
import { connect } from 'react-redux'
import MultiSelect from 'react-native-multiple-select';
const mapStateToProps = (state) => ({
	user_login: state.user_login
})
const { UIManager } = NativeModules;

UIManager.setLayoutAnimationEnabledExperimental &&
  UIManager.setLayoutAnimationEnabledExperimental(true);
class SearchInfo extends Component {
    constructor(props) {
        super(props)
        this.state = {
			item: this.props.val,
			expanded: false,
			
        }
		
            
       
    }
	
		
	
	
	_back = () => {
		Actions.pop()
	 }
	 

	  render() {
		  const { process } = this.state
		  let key = 0
		return (
		  <View style={styles.container}>
		  <StatusBar backgroundColor="#fff" barStyle="dark-content" />
			<View style={[styles.box, {width: width, height: 85}]} >
			
			
			<TouchableOpacity   style={styles.back} onPress={this._back}>
			  <View>
				<Text maxFontSizeMultiplier={1} style={styles.buttonText}>
				    <Icon style={{top:10, marginTop:10}} name={'md-arrow-back'} size={20} color='#000' />
				</Text>
			  </View>
			</TouchableOpacity>
			<Text maxFontSizeMultiplier={1} style={[styles.buttonText, styles.title, {color: '#000'}]}>
				{ this.state.item.title }
			</Text>
			</View>
			<View style={[{width: width, height: height - 85}]} >
			<ScrollView>
			
			<TouchableOpacity style={{position: 'relative', marginTop: 0,width: width, height: width,marginLeft:0}}>
				<View  style={{position: 'relative'}}>
				<Image
                    source={{uri: 'http://casfood.vn/' + this.state.item.image,width: width, height: width}}
                    style={{width: width, width}}

                />
				
			</View>	
			</TouchableOpacity>
			<View style={[{width: width,  marginBottom: 10, marginTop: -4, height: 40, backgroundColor: '#ddd', position: 'relative'}]} >
				
				<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 10, fontWeight: 'bold'}]}>
				    Đánh giá
				</Text>
			</View>
			
			{ (this.state.item.danhgia) ?
			<View>
			<Text maxFontSizeMultiplier={1} style={[{color: '#90D077', fontSize: 15, bottom: 7, left: 10, fontWeight: 'bold', marginBottom: 20, marginTop: 20}]}>
				    Ưu điểm: {this.state.item.danhgia}
				</Text>
			</View>
			: null
			}
			
			{ (this.state.item.danhgiaxau) ?
			<View>
				<Text maxFontSizeMultiplier={1} style={[{color: 'red', fontSize: 15, bottom: 7, left: 10, fontWeight: 'bold'}]}>
				    Nhược điểm: {this.state.item.danhgiaxau}
				</Text>
				</View> : null
			}
			<View style={[{width: width,  marginBottom: 10, marginTop: -4, height: 40, backgroundColor: '#ddd', position: 'relative'}]} >
				
				<Text maxFontSizeMultiplier={1} style={[styles.title, {color: '#757F8C', fontSize: 15, bottom: 7, left: 10, fontWeight: 'bold'}]}>
				    GIÁ TRỊ DINH DƯỠNG 100G PHẦN ĂN ĐƯỢC
				</Text>
			</View>
			<View>
				<View style={[styles.itemList, {backgroundColor: '#fff', marginBottom: 5, borderBottomWidth: 1, borderColor: '#ddd'}]}>
					<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }}>
						
								
						<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 10, fontWeight:'bold'}]}>
									Năng lượng: {this.state.item.energy}Kcal
								</Text>
								
								</TouchableOpacity>
							</View>
							</View>
							
							<View>
							<View style={[styles.itemList, {backgroundColor: '#fff', marginBottom: 5, borderBottomWidth: 1, borderColor: '#ddd'}]}>
					<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }}>
						
								
						<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 10}]}>
									Thải bỏ: {this.state.item.drop_}g
								</Text>
								
								</TouchableOpacity>
							</View>
							</View>
							
							
							<View>
						<View style={[styles.itemList, {backgroundColor: '#fff', marginBottom: 5, borderBottomWidth: 1, borderColor: '#ddd'}]}>
					<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }} onPress={() => {
    this.setState({expanded : !this.state.expanded});
  }}>
						
								
							<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 10, fontWeight:'bold'}]}>
									Protein: {this.state.item.Protein}g
								</Text>
								<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 20}]}>
									<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropdown'} size={20} color='#757F8C' />
								</Text>
								</TouchableOpacity>
								
							</View>
							<View style={{width:width, height: this.state.expanded ? null : 0, overflow: 'hidden', }}>
								<Text maxFontSizeMultiplier={1} style={[{width: width - 30, marginLeft: 15}]}>
									Protein (chất đạm) là thành phần quan trọng nhất để xây dựng các tế bào của cơ thể, cần thiết cho cả quá trình sản sinh tế bào mới và sửa chữa tổn thương các tế bào cũ. Protein là thành phần quan trọng của các yếu tố miễn dịch để bảo vệ cơ thể: tất cả các yếu tố miễn dịch từ miễn dịch tế bào (bạch cầu lympho, đại thực bào...) đến miễn dịch kháng thể (kháng thể và hệ thống bổ thể). Ngoài ra, protein cung cấp năng lượng khi cơ thể thiếu năng lượng từ glucid{"\n"}
Trung bình nhu cầu protein nên chiếm khoảng 15% năng lượng khẩu phần. Lượng cung cấp protein hàng ngày cho cơ thể chủ yếu dùng cho việc cấu trúc tế bào và cấu trúc các chất tham gia chuyển hóa chứ không dùng cho năng lượng hoạt động. Protein được xem là nguồn năng lượng dơ vì sự oxy hóa nitơ để sinh năng lượng sẽ tạo thành NH3 là một chất cực độc mà cơ thể phải huy động tất cả các cơ chế thải độc ở gan và thận để thải ra ngoài càng nhanh càng tốt. {"\n"}
Sự tiêu hóa, hấp thu và chuyển hóa trong cơ thể tiêu hao nhiều năng lượng nhất so với tất cả các chất sinh năng lượng khác. 1gram protein cho 4 KCal. Protein không bị phân hủy qua quá trình chế biến thức ăn, ngược lại nhiệt độ cao sẽ làm thủy phân protein tốt hơn thành các chuỗi peptid ngắn và thức ăn giàu protein được nấu chín kỹ sẽ dễ tiêu hóa và hấp thu hơn. Protein rất dễ bị hư hỏng và phân hủy nhanh trong môi trường nhiệt độ bình thường tạo thành các chất độc gây ngộ độc thực phẩm, dị ứng. Chính vì thế các thức ăn giàu đạm cần được bảo quản trong môi trường nhiệt độ thấp
									
								</Text>
								</View>
							</View>	
							
							
							
							<View>
						<View style={[styles.itemList, {backgroundColor: '#fff', marginBottom: 5, borderBottomWidth: 1, borderColor: '#ddd'}]}>
					<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }} onPress={() => {
    this.setState({Lipid : !this.state.Lipid});
  }}>
						
								
							<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 10, fontWeight:'bold'}]}>
									Lipid: {this.state.item.Lipid}g
								</Text>
								<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 20}]}>
									<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropdown'} size={20} color='#757F8C' />
								</Text>
								</TouchableOpacity>
								
							</View>
							<View style={{width:width, height: this.state.Lipid ? null : 0, overflow: 'hidden', }}>
								<Text maxFontSizeMultiplier={1} style={[{width: width - 30, marginLeft: 15}]}>
									Lipid(chất béo) là nguồn cung cấp và dự trữ năng lượng rất quan trọng, hấp thu và chuyển hóa vitamin tan trong chất béo(A,D,E,K), là nguyên liệu hình thành các tế bào nhất là tế bào thần kinh và nguyên liệu tạo nên các hormone: hormone sinh dục nam nữ, thượng thận{"\n"}
									Đối với trẻ càng nhỏ thì nhu cầu lipid càng cao tương đương với 20 - 50% năng lượng khẩu phần. Người trưởng thành trung bình 15 - 25%. {"\n"}
									Lipid là chất cung cấp năng lượng cao nhất 1gram lipid cung cấp 9kcal. Do đặc tính thể tích nhỏ trong khi năng lượng dự trữ cao, chất béo là dạng dự trữ năng lượng chính của cơ thể sinh vật. Dự trữ năng lượng từ chất béo thường vô hạn so với dự trữ năng lượng từ chất bột đường do chất béo được dự trữ trong các tế bào độc lập gọi là tế bào mỡ. Chất béo ít bị phân hủy bởi nhiệt độ nhưng dễ bị oxi hóa bởi oxi trong điều kiện nhiệt độ cao có ánh nắng mặt trời có hơi nước. Các chất oxi hóa từ chất béo được xem là tác nhân nguy hiểm cho tế bào là tác nhân gây ra hóa tế bào các bệnh lý rối loạn cấu trúc và chức năng tế bào bao gồm cả ung thư.
									
								</Text>
								</View>
							</View>	
							
							<View>
						<View style={[styles.itemList, {backgroundColor: '#fff', marginBottom: 5, borderBottomWidth: 1, borderColor: '#ddd'}]}>
					<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }} onPress={() => {
    this.setState({Glucid : !this.state.Glucid});
  }}>
						
								
							<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 10, fontWeight:'bold'}]}>
									Glucid: {this.state.item.Glucid}g
								</Text>
								<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 20}]}>
									<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropdown'} size={20} color='#757F8C' />
								</Text>
								</TouchableOpacity>
								
							</View>
							<View style={{width:width, height: this.state.Glucid ? null : 0, overflow: 'hidden', }}>
								<Text maxFontSizeMultiplier={1} style={[{width: width - 30, marginLeft: 15}]}>
									Glucid là chất cung cấp năng lượng chính cho các hoạt động của các tế bào trong cơ thể. Có 3 loại tế bào trong cơ thể chỉ sử dụng glucid làm nguyên liệu sinh năng lượng: tế bào não, tế bào hồng cầu và tế bào cơ. Ngoài ra glucid còn tham gia cấu trúc tế bào{"\n"}
									Nhu cầu glucid trung bình hàng ngày chiếm khoảng 55 - 65% năng lượng khẩu phần hàng ngày. Ngay cả khi ăn kiêng do thẩm mỹ hoặc do bệnh lý khẩu phần glucid cũng không nên giảm dưới 50%{"\n"}
									Glucid là nguồn năng lượng sạch khi cơ thể cần glucid phân giải thành ATP, CO2 và nước. 1gram cung cấp 4kcal. Glucid trong thực phẩm tự nhiên thường là dạng hỗn hợp chính vì vậy các dạng hạt, củ nguyên vẹn chưa tinh chế sẽ làm tăng đường huyết chậm so với thực phẩm đã tinh chế. Glucid khi được chế biến với nhiệt độ cao sẽ làm các chuỗi dài glucose bị cắt thành chuỗi nhỏ hơn, dễ tiêu hóa và hấp thu hơn nên cũng làm tăng đường huyết hơn. Ví dụ: khoai nướng hoặc chiên sẽ làm tăng đường huyết nhanh và nhiều gấp đôi so với khoai hấp và luộc.
								</Text>
								</View>
							</View>	
							
							<View>
						<View style={[styles.itemList, {backgroundColor: '#fff', marginBottom: 5, borderBottomWidth: 1, borderColor: '#ddd'}]}>
					<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }} onPress={() => {
    this.setState({Celluloza : !this.state.Celluloza});
  }}>
						
								
							<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 10}]}>
									Celluloza: {this.state.item.Celluloza}g
								</Text>
								<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 20}]}>
									<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropdown'} size={20} color='#757F8C' />
								</Text>
								</TouchableOpacity>
								
							</View>
							<View style={{width:width, height: this.state.Celluloza ? null : 0, overflow: 'hidden', }}>
								<Text maxFontSizeMultiplier={1} style={[{width: width - 30, marginLeft: 15}]}>
									Celluloza(chất xơ) là chất không sinh năng lượng nhưng lại là chất dinh dưỡng bắt buộc để duy trì sự sống vì chúng có những vai trò sau: điều hòa nhu động ruột và hỗ trợ hoạt động của hệ tiêu hóa, chống táo bón, giảm cân, giảm cholesterol máu, làm chậm hấp thu đường huyết{"\n"}
Nhu cầu theo khuyến nghị tối thiểu là 20 - 22g một ngày									
								</Text>
								</View>
							</View>	
							
							
							<View>
						<View style={[styles.itemList, {backgroundColor: '#fff', marginBottom: 5, borderBottomWidth: 1, borderColor: '#ddd'}]}>
					<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }} onPress={() => {
    this.setState({Calci : !this.state.Calci});
  }}>
						
								
							<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 10}]}>
									Calci: {this.state.item.Calci}mg
								</Text>
								<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 20}]}>
									<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropdown'} size={20} color='#757F8C' />
								</Text>
								</TouchableOpacity>
								
							</View>
							<View style={{width:width, height: this.state.Calci ? null : 0, overflow: 'hidden', }}>
								<Text maxFontSizeMultiplier={1} style={[{width: width - 30, marginLeft: 15}]}>
									Calci là khoáng chất có khối lượng lớn nhất trong cơ thể. Calci có vai trò sau: cấu trúc sương và răng qua đó ảnh hưởng đến độ cứng chắc và kích thước của xương và răng, quyết định đến tầm vóc của cơ thể, điều hòa hoạt động của tế bào cơ, là một yếu tố đông máu quan trọng, tham gia vào cấu trúc và hoạt động của các chất dẫn truyền thần kinh, điều tiết hormone, điều hòa huyết áp {"\n"}
									Nhu cầu Calci hàng ngày được tính dựa trên lượng calci cần thiết để dự trữ được một số lượng calci tối đa trong xương và răng
								</Text>
								</View>
							</View>	
							
							<View>
						<View style={[styles.itemList, {backgroundColor: '#fff', marginBottom: 5, borderBottomWidth: 1, borderColor: '#ddd'}]}>
					<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }} onPress={() => {
    this.setState({Fe : !this.state.Fe});
  }}>
						
								
							<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 10}]}>
									Sắt: {this.state.item.Fe}mg
								</Text>
								<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 20}]}>
									<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropdown'} size={20} color='#757F8C' />
								</Text>
								</TouchableOpacity>
								
							</View>
							<View style={{width:width, height: this.state.Fe ? null : 0, overflow: 'hidden', }}>
								<Text maxFontSizeMultiplier={1} style={[{width: width - 30, marginLeft: 15}]}>
									Sắt là một chất dinh dưỡng thiết yếu đóng vai trò quan trọng trong hoạt động của hầu hết các tế bào trong cơ thể. Phần lớn sắt trong cơ thể dùng trong cấu trúc hemoglobin(hồng cầu) và myoglobin(thành phần của sợi cơ). Trong cả hai loại tế bào này sắt giữ nhiệm vụ nhận, giữ và giải phóng oxi. Ngoài ra sắt tham gia vào phản ứng oxi hóa trong chu trình chuyển hóa tạo năng lượng của tất cả các tế bào{"\n"}
									Do sự hấp thụ sắt chịu ảnh hưởng của nhiều yếu tố như nhu cầu sắt của cơ thể, sự hiện diện của chất đồng hấp thu hay phản hấp thu vì vậy nên tham khảo nhu cầu sắt theo bảng khuyến nghị về nhu cầu sắt cho người Việt Nam của Bộ y tế{"\n"}
									Nguồn cung cấp sắt tốt nhất là các loại thức ăn động vật: thịt cá trứng và trong thực vật như nấm rong biển đậu nành. Quá trình hấp thu sắt cần có vitamin C vì thế nên ăn các thức ăn giầu sắt với các thực phẩm giàu vitamin C như chanh cam quít bưởi...
								</Text>
								</View>
							</View>	
							
							
							<View>
						<View style={[styles.itemList, {backgroundColor: '#fff', marginBottom: 5, borderBottomWidth: 1, borderColor: '#ddd'}]}>
					<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }} onPress={() => {
    this.setState({Kali : !this.state.Kali});
  }}>
						
								
							<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 10}]}>
									Kali: {this.state.item.Kali}mg
								</Text>
								<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 20}]}>
									<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropdown'} size={20} color='#757F8C' />
								</Text>
								</TouchableOpacity>
								
							</View>
							<View style={{width:width, height: this.state.Kali ? null : 0, overflow: 'hidden', }}>
								<Text maxFontSizeMultiplier={1} style={[{width: width - 30, marginLeft: 15}]}>
									Kali là thành phần trọng yếu của hoạt động điện nhất là tế bào cơ vì vậy có ảnh hưởng đến nhịp tim và sức co bóp của cơ tim, góp phần điều hòa xung động thần kinh ở tim và duy trì huyết áp ổn định. Ngoài ra kali tham gia điều hòa thăng bằng kiềm toan của cơ thể, phản ứng tổng hợp glycogen và protein của cơ thể.{"\n"}
									Các nghiên cứu cho thấy khẩu phần dinh dưỡng thiếu kali dường như có sự liên hệ với tăng huyết áp và sự điều chỉnh tăng lượng kali trong khẩu phần có tác dụng điều chỉnh huyết áp và ngăn ngừa tăng huyết áp.{"\n"}
									Nhu cầu khuyến nghị về kali theo bản nhu cầu khuyến nghị cho người Việt Nam của Bộ y tế
								</Text>
								</View>
							</View>	
							
							
							<View>
						<View style={[styles.itemList, {backgroundColor: '#fff', marginBottom: 5, borderBottomWidth: 1, borderColor: '#ddd'}]}>
					<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }} onPress={() => {
    this.setState({Natri : !this.state.Natri});
  }}>
						
								
							<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 10}]}>
									Natri: {this.state.item.Natri}mg
								</Text>
								<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 20}]}>
									<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropdown'} size={20} color='#757F8C' />
								</Text>
								</TouchableOpacity>
								
							</View>
							<View style={{width:width, height: this.state.Natri ? null : 0, overflow: 'hidden', }}>
								<Text maxFontSizeMultiplier={1} style={[{width: width - 30, marginLeft: 15}]}>
									Natri là một thành phần quan trọng giúp điều hòa thằng bằng kiềm toan của cơ thể, hoạt động điện sinh lý trong cơ, thần kinh. Khẩu phần ăn hàng ngày hiếm khi thiếu natri. Natri được cung cấp nhiều nhất và dễ nhận biết nhất qua muối ăn. Muối ăn cung cấp 75% lương natri trong khẩu phần, phần còn lại nằm trong các chất phụ gia(mỳ chính, bột nêm, bột canh) và các thực phẩm từ thiên nhiên như trái cây rau, sữa thịt{"\n"}
									Natri trong khẩu phần ăn hàng ngày liên quan mật thiết đến sự gia tăng huyết áp. Các nghiên cứu cũng cho thấy lượng muối ăn hàng ngày ảnh hưởng đến huyết áp nhiều hơn so với các dạng cung cấp natri khác. Việc điều chỉnh lượng muối trong khẩu phần cũng cần thiết với các bệnh lý như tim mạch, thận, tiểu đường, béo phì{"\n"}
									Nhu cầu khuyến nghị về muối ăn là dưới 5gram một ngày
								</Text>
								</View>
							</View>	
							
							
							<View>
						<View style={[styles.itemList, {backgroundColor: '#fff', marginBottom: 5, borderBottomWidth: 1, borderColor: '#ddd'}]}>
					<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }} onPress={() => {
    this.setState({Zn : !this.state.Zn});
  }}>
						
								
							<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 10}]}>
									Kẽm: {this.state.item.Zn}mg
								</Text>
								<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 20}]}>
									<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropdown'} size={20} color='#757F8C' />
								</Text>
								</TouchableOpacity>
								
							</View>
							<View style={{width:width, height: this.state.Zn ? null : 0, overflow: 'hidden', }}>
								<Text maxFontSizeMultiplier={1} style={[{width: width - 30, marginLeft: 15}]}>
									Kẽm là một nguyên tố vi lượng hoạt động như một yếu tố hỗ trợ cho hơn 100 loại enzym trong cơ thể. tế bào nào trong cơ thể cũng phải có kẽm nhưng kẽm tập trung nhiều nhất ở xương và cơ. Do tham gia vào hầu hết các loại enzym, nên kẽm có liên quan đến nhiều hoạt động khác nhau của cơ thể: chuyển hóa năng lượng tổng hợp protein, thành phần của men tiêu hóa, hỗ trợ hoạt động miễn dịch, hỗ trợ hoạt động và chuyển hóa của insulin, hấp thu và vận chuyển vitamin A, ảnh hưởng đến tri giác và nhận thức, tăng tốc độ lành vết thương, ảnh hưởng đến quá trình tạo tinh dịch và nội tiết sinh dục, ảnh hưởng đến sự phát triển của thai nhi, trung hòa các gốc oxi hóa, chuyển hóa chất cồn...{"\n"}
									Nhu cầu khuyến nghị về kẽm theo bản nhu cầu khuyến nghị cho người Việt Nam của Bộ y tế{"\n"}
									Nguồn cung cấp kẽm nhiều nhất trong tự nhiên và hàu sò và các loại hải sản có vỏ. Ngoài ra kẽm còn được cung cấp chủ yếu qua thức ăn động vật như thịt heo bò gia cầm...
								</Text>
								</View>
							</View>	
							
							
							<View>
						<View style={[styles.itemList, {backgroundColor: '#fff', marginBottom: 5, borderBottomWidth: 1, borderColor: '#ddd'}]}>
					<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }} onPress={() => {
    this.setState({Vitamin_C : !this.state.Vitamin_C});
  }}>
						
								
							<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 10}]}>
									Vitamin C: {this.state.item.Vitamin_C}mcg
								</Text>
								<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 20}]}>
									<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropdown'} size={20} color='#757F8C' />
								</Text>
								</TouchableOpacity>
								
							</View>
							<View style={{width:width, height: this.state.Vitamin_C ? null : 0, overflow: 'hidden', }}>
								<Text maxFontSizeMultiplier={1} style={[{width: width - 30, marginLeft: 15}]}>
									Vitamin C là một yếu tố hỗ trợ quan trọng trong rất nhiều hoạt động của cơ thể. Các vai trò được nhắc đến nhiều nhất của vitamin C là chống oxi hóa, tham gia quá trình tổng hợp colagen, tổng hợp hormone tuyến giáp, chuyển hóa amino acid, giúp gia tăng sức đề kháng của cơ thể và là chất hỗ trợ hấp thu của nhiều loại vi khuẩn{"\n"}
									Nhu cầu khuyến nghị về Vitamin C theo bản nhu cầu khuyến nghị cho người Việt Nam của Bộ y tế{"\n"}
									Nguồn cung cấp vitamin C có nhiều nhất trong các loại trái cây họ Citrus: cam, chanh, bưởi. Tuy nhiên hầu hết tất cả các loại rau, trái cây tươi đều cung cấp khẩu phần vitamin C dồi dào cho cơ thể 
								</Text>
								</View>
							</View>	
							
							
							<View>
						<View style={[styles.itemList, {backgroundColor: '#fff', marginBottom: 5, borderBottomWidth: 1, borderColor: '#ddd'}]}>
					<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }} onPress={() => {
    this.setState({Vitamin_A : !this.state.Vitamin_A});
  }}>
						
								
							<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 10}]}>
									Vitamin A: {this.state.item.Vitamin_A}mcg
								</Text>
								<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 20}]}>
									<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropdown'} size={20} color='#757F8C' />
								</Text>
								</TouchableOpacity>
								
							</View>
							<View style={{width:width, height: this.state.Vitamin_A ? null : 0, overflow: 'hidden', }}>
								<Text maxFontSizeMultiplier={1} style={[{width: width - 30, marginLeft: 15}]}>
									Vitamin A là loại vitamin tan trong chất béo đầu tiên được nhận biết chúng có vai trò như sau: giúp tăng trưởng về chất(cân nặng và chiều cao), bảo vệ cơ thể chống nhiễm trùng, nuôi dưỡng và tái tạo lớp biểu mô niêm mạc, lớp thượng bì của da, là một yếu tố phòng chống ung thư và có vai trò quan trọng với thị giác
									{"\n"}Nhu cầu khuyến nghị về Vitamin A theo bản nhu cầu khuyến nghị cho người Việt Nam của Bộ y tế{"\n"}
									Nguồn cung cấp thực phẩm giàu vitamin A nhất là gan động vật, giầu ăn cá, trứng sữa và các chế phẩm từ sữa. Các loại thức ăn cung cấp tiền vitamin A thường có màu vàng cam đỏ đậm, xanh đậm. Để tăng hấp thu các thực phẩm này cần ăn kèm với chất béo
								</Text>
								</View>
							</View>	
							
							
							<View>
						<View style={[styles.itemList, {backgroundColor: '#fff', marginBottom: 5, borderBottomWidth: 1, borderColor: '#ddd'}]}>
					<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }} onPress={() => {
    this.setState({Beta_caroten : !this.state.Beta_caroten});
  }}>
						
								
							<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 10}]}>
									Beta caroten: {this.state.item.Beta_caroten}mcg
								</Text>
								<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 20}]}>
									<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropdown'} size={20} color='#757F8C' />
								</Text>
								</TouchableOpacity>
								
							</View>
							<View style={{width:width, height: this.state.Beta_caroten ? null : 0, overflow: 'hidden', }}>
								<Text maxFontSizeMultiplier={1} style={[{width: width - 30, marginLeft: 15}]}>
									Beta caroten là một dạng tiền chất của vitamin A sau khi hấp thụ vào cơ thể sẽ được chuyển thành vitamin A dưới dạng retinal với tỷ số chuyển đổi là 12 beta caroten: 1 retinal
									
								</Text>
								</View>
							</View>	
							
							<View>
						<View style={[styles.itemList, {backgroundColor: '#fff', marginBottom: 5, borderBottomWidth: 1, borderColor: '#ddd'}]}>
					<TouchableOpacity style={{ marginTop: 10, height: 30, position: 'relative', width: width }} onPress={() => {
    this.setState({Cholesterol : !this.state.Cholesterol});
  }}>
						
								
							<Text maxFontSizeMultiplier={1} style={[styles.itemListText, {paddingLeft: 10}]}>
									Cholesterol: {this.state.item.Cholesterol}mg
								</Text>
								<Text maxFontSizeMultiplier={1} style={[{position:'absolute', right: 20}]}>
									<Icon style={{top:10, marginTop:10}} name={'md-arrow-dropdown'} size={20} color='#757F8C' />
								</Text>
								</TouchableOpacity>
								
							</View>
							<View style={{width:width, height: this.state.Cholesterol ? null : 0, overflow: 'hidden', }}>
								<Text maxFontSizeMultiplier={1} style={[{width: width - 30, marginLeft: 15}]}>
									Cholesterol là sản phẩm chuyển hóa của lipid. Cholesterol có mối liên hệ mật thiết với bệnh mạch vành. Vì thế tổng lượng cholesterol khuyến cáo trong một ngày không quá 300mg
								
								</Text>
								</View>
							</View>	
			</ScrollView>
			</View>
		  </View>
		);
	  }
}
const styles = StyleSheet.create({
	wrapOption: {
		shadowColor: '#000',
		
		shadowOffset: { width: 0, height: 1 },
		shadowOpacity: 0.8,
		shadowRadius: 2,  
		elevation: 5,
		position: 'absolute',
		width: width,

		
	},
	itemOption: {
		zIndex: 3,
		position: 'relative',
		justifyContent: 'center', 
		width: width - 80,

		
		
	},
	itemList: {
		zIndex: 0,
		position: 'relative',
		
		
		height:40,
		flexDirection: 'row',
	},
	
	itemListText_: {
		color: '#757F8C',
		fontSize: 16,
		minWidth: width - 10,
		marginLeft: 10,
	},
	itemListText: {
	color: '#757F8C',
    fontSize: 16,
	width: width - 40,
	marginLeft: 10,
  },
  container: {
    flex: 1,
    position: 'relative',
  },
  input: {
        margin: 0, 
        padding: 0, 
        flex: 1, 
        height: 40, 
        paddingLeft: 8, 
		color: '#757F8C',
        fontSize: 16
    },
  formGroup: {
        flexDirection: 'column', 
        marginBottom: 5, 
        paddingHorizontal: 0
    },
	itemInput: {
        flexDirection: 'row', 
		width: width,
		color: '#757F8C',
		marginTop: 5,
        borderColor: '#757F8C',
        borderBottomWidth: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
	labelInput: {
        fontSize: 13, 
        color: '#757F8C', 
        marginBottom: 5
    },
  box: {
    position: 'relative',
	zIndex: 0,
    backgroundColor: '#fff',
  },
  
  icon: {
	  zIndex: 1,
	left:15,
	bottom:10,
	position: 'absolute',
	color: '#fff',
	fontSize: 20,
   
  },
  back: {
	zIndex: 1,
	left:0,
	bottom:0,
	position: 'absolute',
	color: '#fff',
	fontSize: 20,
   paddingHorizontal: 20,
    paddingVertical: 15,
  },
  button: {  
	zIndex: 1,
	bottom:0,
	right:0,
	position: 'absolute',
	color: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 15,
    marginTop: 15,
  },
  buttonText: {
    color: '#fff',
	fontSize: 20,
  },
  title: {
	zIndex: 1,
	bottom:15,
	left:50,
	position: 'absolute',
	color: '#fff',
	fontSize: 20,
   
  },
});
export default connect(mapStateToProps)(SearchInfo)