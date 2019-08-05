import React from 'react';

class ImageView extends React.Component{

    constructor(props) {    
        super(props);

        this.state = {
            canvas:null,
            context:null,
            img:null,
            file:null,
            width:0,
            height:0
        }
      }

    scaleImage = (w, h, ctx, img) => {

        ctx.drawImage(img, 0, 0, w, h);    
    }

    drawRectangle = (coord,ctx,width,height,img,color,border) => {
      
        let ratioX = width/img.width;
        let ratioY = height/img.height;

        ctx.beginPath();
        ctx.lineWidth = border;
        ctx.strokeStyle = color;
        

        ctx.moveTo(coord[0]*ratioX, height-coord[1]*ratioY);
        ctx.lineTo(coord[2]*ratioX, height-coord[3]*ratioY);
        ctx.lineTo(coord[4]*ratioX, height-coord[5]*ratioY);
        ctx.lineTo(coord[6]*ratioX, height-coord[7]*ratioY);
        ctx.lineTo(coord[0]*ratioX, height-coord[1]*ratioY);

        ctx.stroke();

    }

    drawKeyValuePairs = (ctx,w,h,img) => {
        if(this.props.keyValuePairs.length > 0 ){

            //console.log(JSON.stringify(this.props.keyValuePairs));
            var key;
            var coordKey;
            var val;
            var coordVal;

            for(var kv in this.props.keyValuePairs){

                if(this.props.keyValuePairs[kv]["key"].length > 0){
                    key = this.props.keyValuePairs[kv]["key"][0];
                    coordKey = key["boundingBox"];
                    this.drawRectangle(coordKey,ctx,w,h,img,"red","1px");
                }
                
                if(this.props.keyValuePairs[kv]["value"].length > 0){
                    val = this.props.keyValuePairs[kv]["value"][0];
                    coordVal = val["boundingBox"];
                    this.drawRectangle(coordVal,ctx,w,h,img,"green","1px");
                }

                if(this.props.keyValuePairs[kv]["key"].length > 0 && this.props.keyValuePairs[kv]["value"].length > 0){
                    let maxY = coordKey[1] > coordVal[1] ? coordKey[1] : coordVal[1];
                    let minY = coordKey[5] < coordVal[5] ? coordKey[5] : coordVal[5];
                    let coord = [coordKey[0],maxY,coordVal[2],maxY,coordVal[2],minY,coordKey[0],minY];
                    this.drawRectangle(coord,ctx,w,h,img,"blue","0.4px");
                }

            }
        }
    }

    drawLines = (ctx,w,h,img) => {

            for(var line in this.props.linesReceipt){

                    this.drawRectangle(this.props.linesReceipt[line]["boundingBox"],ctx,w,h,img,"red","1px");
                
            }
        
    }

    drawBoundingBoxes = (ctx,w,h,img) => {

        if(this.props.isReceipt === true){
            this.drawLines(ctx,w,h,img);
        }
        else{
            this.drawKeyValuePairs(ctx,w,h,img);
        }
    }

    componentDidMount() {
        const canvas = this.refs.canvas;
        const ctx = canvas.getContext("2d");

        const img = this.refs.image;
        var reader = new FileReader();
        reader.onload = () => {
            img.src = reader.result;
        }
        reader.readAsDataURL(this.props.file);

        img.onload = () => {
            let w = canvas.width;
            let h = Math.round(canvas.width*img.height/img.width);

            console.log(`Width: ${img.width} -> ${w} Height: ${img.height} -> ${h}`);

            canvas.height = h;
            this.scaleImage(w,h,ctx,img);

            this.setState({canvas});
            this.setState({context:ctx});
            this.setState({img});
            this.setState({width:w});
            this.setState({height:h});

            this.drawBoundingBoxes(ctx,w,h,img);
        }
      }

      componentWillReceiveProps() {
            var reader = new FileReader();
            const img = this.refs.image;
            reader.onload = () => {
                img.src = reader.result;
            }
            reader.readAsDataURL(this.props.file);
            var canvas = this.state.canvas;
            var ctx = this.state.context;
            img.onload = () => {
                let w = canvas.width;
                let h = Math.round(canvas.width*img.height/img.width);
    
                console.log(`Width: ${img.width} -> ${w} Height: ${img.height} -> ${h}`);
    
                canvas.height = h;
                this.scaleImage(w,h,ctx,img);
    
                this.setState({context:ctx});
                this.setState({img});
                this.setState({width:w});
                this.setState({height:h});
    
                this.drawBoundingBoxes(ctx,w,h,img);
            }
      }


    render(){
        return (
        <div id="imageView">
            <canvas ref="canvas" id="canvasImageView"/>
            <img ref="image" alt="" className="imgDisplay" src="https://katiastorage.blob.core.windows.net/dataset-test-adecco/S52_Page_13.jpg?sp=rl&st=2019-07-15T16:38:45Z&se=2019-10-24T16:38:00Z&sv=2018-03-28&sig=Bg6NE%2F9Gx9DvAE3Syoh51EWullsvonEihjI%2FUwsrsEs%3D&sr=b" />
        </div>
        )
    }
  }
  
  export default ImageView;