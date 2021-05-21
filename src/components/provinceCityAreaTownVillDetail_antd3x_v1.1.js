import React , {useState , useEffect ,forwardRef} from "react";
import {
    Select,
    Input,
    Form,
} from "antd";
import {
    province as getProvinceList,
    city as getCityList,
    area as getAreaList,
    getTownStreetByParentId as getTownOrVillList
  } from "@/request/publicApi";

const { Option } = Select;
const { Item } = Form;

export default forwardRef( (props , ref) => {
  const { 
    value = {
      province:{ name : undefined, id : undefined},
      city:{ name : undefined , id : undefined},
      area:{ name : undefined , id : undefined},
      town:{ name : undefined , id : undefined},
      vill:{ name : undefined , id : undefined},
      detail : undefined,
    },
    config = {
      useProvince:true,
      useCity:true,
      useArea:true,
      useTown:false,
      useVill:false,
      useDetail:false,
    },
    onChange,
  } = props;

  
  const { province , city , area , town , vill , detail } = value;
  const { useProvince , useCity , useArea , useTown , useVill , useDetail } = config;

  const [provinceList , setProvinceList] = useState([]);
  const [cityList , setCityList] = useState([]);
  const [areaList , setAreaList] = useState([]);
  const [townList , setTownList] = useState([]);
  const [villList , setVillList] = useState([]);

  const [provinceLoading , setProvinceLoading] = useState(false);
  const [cityLoading , setCityLoading] = useState(false);
  const [areaLoading , setAreaLoading] = useState(false);
  const [townLoading , setTownLoading] = useState(false);
  const [villLoading , setVillLoading] = useState(false);

  useEffect( ()=>{
    apiProvince();
  } , [])

  useEffect( ()=>{
    console.log("props" , props)
  } , [value])

  const apiProvince = ()=>{
    setProvinceLoading(true);
    useProvince && getProvinceList().then( res => {
      const {code , data} = res;
      if(code === 0){
        setProvinceList(data);
      }else{
        setProvinceList([]);
      }
    }).finally( ()=>{
      setProvinceLoading(false);
    })
  }

  const apiCity = params =>{
    setCityLoading(true);
    useCity && getCityList(params).then( res => {
      const {code , data} = res;
      if(code === 0){
        setCityList(data);
      }else{
        setCityList([]);
      }
    }).finally( ()=>{
      setCityLoading(false);
    })
  }

  const apiArea = params =>{
    setAreaLoading(true);
    useArea && getAreaList(params).then( res => {
      const {code , data} = res;
      if(code === 0){
        setAreaList(data);
      }else{
        setAreaList([]);
      }
    }).finally( ()=>{
      setAreaLoading(false);
    })
  }

  const apiTown = params =>{
    setTownLoading(true);
    useTown && getTownOrVillList(params).then( res => {
      const {code , data} = res;
      if(code === 0){
        setTownList(data);
      }else{
        setTownList([]);
      }
    }).finally( ()=>{
      setTownLoading(false);
    })
  }

  const apiVill = params =>{
    setVillLoading(true);
    useVill && getTownOrVillList(params).then( res => {
      const {code , data} = res;
      if(code === 0){
        setVillList(data);
      }else{
        setVillList([]);
      }
    }).finally( ()=>{
      setVillLoading(false);
    })
  }

  const handleSelectChange = ( id , type )=>{
    let findItem = undefined;
    switch(type){
      case "province":
        findItem = provinceList.find( (item)=> item.provinceId === id);
        if( findItem ){
          setAreaList([]);
          apiCity( { provinceId : findItem.provinceId } );
          triggerChange(
            {
              province:{ name: findItem["provinceName"] , id: findItem["provinceId"] },
              city:{ name : undefined , id : undefined},
              area:{ name : undefined , id : undefined},
              town:{ name : undefined , id : undefined},
              vill:{ name : undefined , id : undefined},
              detail:undefined,
            }
          )
        } 
      break;

      case "city":
        findItem = cityList.find( (item)=> item.cityId === id);
        if( findItem ){
          setTownList([])
          apiArea( { cityId : findItem.cityId } );
          triggerChange(
            {
              city:{ name: findItem["cityName"] , id: findItem["cityId"] },
              area:{ name : undefined , id : undefined},
              town:{ name : undefined , id : undefined},
              vill:{ name : undefined , id : undefined},
              detail:undefined,
            }
          )
        } 
      break;

      case "area":
        findItem = areaList.find( (item)=> item.areaId === id);
        if( findItem ){
          apiTown( { parentId : findItem.areaId } );
          triggerChange(
            {
              area:{ name: findItem["areaName"] , id: findItem["areaId"] },
              town:{ name : undefined , id : undefined},
              vill:{ name : undefined , id : undefined},
              detail:undefined,
            }
          )
        } 
      break;

      case "town":
        findItem = townList.find( (item)=> item.townId === id);
        if( findItem ){
          apiVill( { parentId : findItem.areaId } );
          triggerChange(
            {
              town:{ name: findItem["townName"] , id: findItem["townId"] },
              vill:{ name : undefined , id : undefined},
              detail:undefined,
            }
          )
        } 
      break;

      case "vill":
        findItem = villList.find( (item)=> item.villageId === id);
        if( findItem ){
          triggerChange(
            {
              vill:{ name: findItem["villageName"] , id: findItem["villageId"] },
              detail:undefined,
            }
          )
        } 
      break;
    }
  }

  const handleInputChange = (e) =>{
    triggerChange({
      detail: e.target.value,
    })
  }

  const triggerChange = ( changeValue )=>{
    console.log("changeValue",changeValue)
    onChange({
      ...value,
      ...changeValue,
    })
  }

  return (
    <>
      {
        useProvince && 
        <Item>
          <Select 
          style = {{width:"110px"}}
          value = { province["id"] }
          loading = {provinceLoading}
          // allowClear
          placeholder = "请选择省"
          onChange = { (id)=> handleSelectChange(id , "province") }>
            { Array.isArray(provinceList) && provinceList.map( item => <Option value={ item.provinceId } key={item.provinceId}>{item.provinceName}</Option>) } 
          </Select>
        </Item>
      }
      {
        useCity && 
        <Item>
          <Select 
          style = {{width:"110px"}}
          value = { city["id"] }
          loading = {cityLoading}
          // allowClear
          placeholder = "请选择市"
          onChange = { (id)=> handleSelectChange(id , "city") }>
            { Array.isArray(cityList) && cityList.map( item => <Option value={ item.cityId } key={item.cityId}>{item.cityName}</Option>) } 
          </Select>
        </Item>
      }
      {
        useArea && 
        <Item>
          <Select 
          style = {{width:"110px"}}
          value = { area["id"] }
          loading = {areaLoading}
          // allowClear
          placeholder = "请选择区"
          onChange = { (id)=> handleSelectChange(id , "area") }>
            { Array.isArray(areaList) && areaList.map( item => <Option value={ item.areaId } key={item.areaId}>{item.areaName}</Option>) } 
          </Select>
        </Item>
      }
      {
        useTown && 
        <Item>
          <Select 
          style = {{width:"110px"}}
          value = { town["id"] }
          loading = {townLoading}
          // allowClear
          placeholder = "请选择镇"
          onChange = { (id)=> handleSelectChange(id , "town") }>
            { Array.isArray(townList) && townList.map( item => <Option value={ item.townId } key={item.townId}>{item.townName}</Option>) } 
          </Select>
        </Item>
      }
      {
        useVill && 
        <Item>
          <Select 
          style = {{width:"110px"}}
          value = { vill["id"] }
          loading = {villLoading}
          // allowClear
          placeholder = "请选择乡"
          onChange = { (id)=> handleSelectChange( id , "vill") }>
            { Array.isArray(villList) && villList.map( item => <Option value={ item.villageId } key={item.villageId}>{item.villageName}</Option>) } 
          </Select>
        </Item>
      }
      { 
        useDetail && 
        <Item>
          <Input 
           style = {{width:"110px"}}
          value = {detail}
          handleChange = { handleInputChange }></Input>
        </Item>
      }
    </>
  )
  

})