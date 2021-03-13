
var scriptName="KeyStrokePlus";
var scriptAuthor="func16";
var scriptVersion=1.0;

//Utils
var Color=Java.type('java.awt.Color');
var RenderUtils=Java.type('net.ccbluex.liquidbounce.utils.render.RenderUtils');
var ColorUtils = Java.type('net.ccbluex.liquidbounce.utils.render.ColorUtils');

var ScaledResolution=Java.type("net.minecraft.client.gui.ScaledResolution");
var ww=new ScaledResolution(mc).getScaledWidth()
var hh=new ScaledResolution(mc).getScaledHeight()

var Keyboard=Java.type('org.lwjgl.input.Keyboard');
var Mouse=Java.type('org.lwjgl.input.Mouse');

var GL11 = Java.type("org.lwjgl.opengl.GL11");

function drawRect(paramXStart, paramYStart, paramXEnd, paramYEnd, color) {
	
	nul=function(){}
	color instanceof Java.type('java.awt.Color')?color=color.getRGB():nul();
	var alpha = (color >> 24 & 0xFF) / 255;
	var red = (color >> 16 & 0xFF) / 255;
	var green = (color >> 8 & 0xFF) / 255;
	var blue = (color >> 0 & 0xFF) / 255;
	
	GL11.glEnable(GL11.GL_BLEND);
	GL11.glDisable(GL11.GL_TEXTURE_2D);
	GL11.glBlendFunc(GL11.GL_SRC_ALPHA, GL11.GL_ONE_MINUS_SRC_ALPHA);
	GL11.glEnable(GL11.GL_LINE_SMOOTH);
	GL11.glPushMatrix();
	GL11.glColor4f(red, green, blue, alpha);
	GL11.glBegin(GL11.GL_TRIANGLE_FAN);
	GL11.glVertex2d(paramXEnd, paramYStart);
	GL11.glVertex2d(paramXStart, paramYStart);
	GL11.glVertex2d(paramXStart, paramYEnd);
	GL11.glVertex2d(paramXEnd, paramYEnd);
	GL11.glEnd();
	GL11.glPopMatrix();
	GL11.glEnable(GL11.GL_TEXTURE_2D);
	GL11.glDisable(GL11.GL_BLEND);
	GL11.glDisable(GL11.GL_LINE_SMOOTH);
	GL11.glColor4f(1, 1, 1, 1);
	
}

function drawOuterBorder(x1,y1,x2,y2,color,wid){
	drawRect(x1-wid,y1-wid,x2+wid,y1,color)
	drawRect(x1-wid,y1-wid,x1,y2+wid,color)
	drawRect(x2+wid,y2+wid,x2,y1-wid,color)
	drawRect(x2+wid,y2+wid,x1-wid,y2,color)
}

function drawInnerBorder(x1,y1,x2,y2,color,wid){
	drawRect(x1,y1,x2,y1+wid,color)
	drawRect(x1,y1,x1+wid,y2,color)
	drawRect(x2,y2,x2-wid,y1,color)
	drawRect(x2,y2,x1,y2-wid,color)
}

log=function(input){
	if(typeof(arguments[0])=="undefined")return;
	
	var prefix="§8[§9§lLog§8] §3";
	var merge="";
	if(typeof(arguments[1])!="undefined"){
		for(var i in arguments){
			if(i!=arguments.length-1){
				merge+=arguments[i].toString()+", ";
				continue;
			}
			merge+=arguments[i].toString();
		}
	}
	try{
		if(merge==""){
			chat.print(prefix+arguments[0].toString());
			return;
		}
		chat.print(prefix+merge);
	}catch(er){
		chat.print(prefix+er.toString());
	}
}

function setAlpha(input,alpha){
	return (new Color(input.getRed(),input.getGreen(),input.getBlue(),alpha))
}

nul=function(){}

//>

//================//
//KeyStroke
var PosX=value.createInteger("PosX",0,0,ww);
var PosY=value.createInteger("PosY",0,0,hh);
var Scale=value.createFloat("Scale",1.00,0.50,1.50);

var Key_Margin=value.createInteger("Key Margin",1,0,5);

var Key_Red=value.createInteger("Key Red",255,0,255);
var Key_Green=value.createInteger("Key Green",0,0,255);
var Key_Blue=value.createInteger("Key Blue",0,0,255);
var Key_Alpha=value.createInteger("Key Alpha",128,0,250);
var Key_Rainbow = value.createBoolean("Key Rainbow", true);
var Key_Rainbow_Offset=value.createInteger("Key Rainbow Offset",0,-500,1000);

var KeyDown_Red=value.createInteger("KeyDown Red",255,0,255);
var KeyDown_Green=value.createInteger("KeyDown Green",0,0,255);
var KeyDown_Blue=value.createInteger("KeyDown Blue",0,0,255);
var KeyDown_Alpha=value.createInteger("KeyDown Alpha",128,0,250);
var KeyDown_Rainbow = value.createBoolean("KeyDown Rainbow", true);
var KeyDown_Rainbow_Offset=value.createInteger("KeyDown Rainbow Offset",0,-500,1000);

var Text_Red=value.createInteger("Text Red",255,0,255);
var Text_Green=value.createInteger("Text Green",0,0,255);
var Text_Blue=value.createInteger("Text Blue",0,0,255);
var Text_Rainbow = value.createBoolean("Text Rainbow", true);
var Text_Rainbow_Offset=value.createInteger("Text Rainbow Offset",0,-500,1000);
var Text_WithShadow = value.createBoolean("Text WithShadow", true);

var Border = value.createBoolean("Border", true);
var Border_Style = value.createList("Border Style",["Inner","Outer"],"Inner");
var Border_Width=value.createInteger("Border Width",1,1,5);
var Border_Red=value.createInteger("Border Red",255,0,255);
var Border_Green=value.createInteger("Border Green",0,0,255);
var Border_Blue=value.createInteger("Border Blue",0,0,255);
var Border_Alpha=value.createInteger("Border Alpha",128,0,250);
var Border_Rainbow = value.createBoolean("Border Rainbow", true);
var Border_Rainbow_Offset=value.createInteger("Border Rainbow Offset",0,-500,1000);

var KeyW_Color;
var KeyA_Color;
var KeyS_Color;
var KeyD_Color;
var KeyLMB_Color;
var KeyRMB_Color;
var KeySpace_Color;

var Text_Color;

var Border_Color
//>


function ModMain(){
	this.getName=function(){
		return "KeyStrokePlus";
	};
	
	this.getDescription=function(){
		return "Key Stroke Plus"
	};
	
	this.getCategory=function(){
		return "Fun"
	};
	
	this.onEnable=function(){
		
	}
	
	this.onUpdate = function(){
		
		if(Keyboard.isKeyDown(Keyboard.KEY_W)){
			if(KeyDown_Rainbow.get()){
				KeyW_Color=setAlpha(ColorUtils.rainbow(KeyDown_Rainbow_Offset.get()),KeyDown_Alpha.get())
			}else{
				KeyW_Color=new Color(KeyDown_Red.get(),KeyDown_Green.get(),KeyDown_Blue.get(),KeyDown_Alpha.get());
			}
		}else{
			if(Key_Rainbow.get()){
				KeyW_Color=setAlpha(ColorUtils.rainbow(Key_Rainbow_Offset.get()),Key_Alpha.get())
			}else{
				KeyW_Color=new Color(Key_Red.get(),Key_Green.get(),Key_Blue.get(),Key_Alpha.get());
			}
		}
		if(Keyboard.isKeyDown(Keyboard.KEY_A)){
			if(KeyDown_Rainbow.get()){
				KeyA_Color=setAlpha(ColorUtils.rainbow(KeyDown_Rainbow_Offset.get()),KeyDown_Alpha.get())
			}else{
				KeyA_Color=new Color(KeyDown_Red.get(),KeyDown_Green.get(),KeyDown_Blue.get(),KeyDown_Alpha.get());
			}
		}else{
			if(Key_Rainbow.get()){
				KeyA_Color=setAlpha(ColorUtils.rainbow(Key_Rainbow_Offset.get()),Key_Alpha.get())
			}else{
				KeyA_Color=new Color(Key_Red.get(),Key_Green.get(),Key_Blue.get(),Key_Alpha.get());
			}
		}
		if(Keyboard.isKeyDown(Keyboard.KEY_S)){
			if(KeyDown_Rainbow.get()){
				KeyS_Color=setAlpha(ColorUtils.rainbow(KeyDown_Rainbow_Offset.get()),KeyDown_Alpha.get())
			}else{
				KeyS_Color=new Color(KeyDown_Red.get(),KeyDown_Green.get(),KeyDown_Blue.get(),KeyDown_Alpha.get());
			}
		}else{
			if(Key_Rainbow.get()){
				KeyS_Color=setAlpha(ColorUtils.rainbow(Key_Rainbow_Offset.get()),Key_Alpha.get())
			}else{
				KeyS_Color=new Color(Key_Red.get(),Key_Green.get(),Key_Blue.get(),Key_Alpha.get());
			}
		}
		if(Keyboard.isKeyDown(Keyboard.KEY_D)){
			if(KeyDown_Rainbow.get()){
				KeyD_Color=setAlpha(ColorUtils.rainbow(KeyDown_Rainbow_Offset.get()),KeyDown_Alpha.get())
			}else{
				KeyD_Color=new Color(KeyDown_Red.get(),KeyDown_Green.get(),KeyDown_Blue.get(),KeyDown_Alpha.get());
			}
		}else{
			if(Key_Rainbow.get()){
				KeyD_Color=setAlpha(ColorUtils.rainbow(Key_Rainbow_Offset.get()),Key_Alpha.get())
			}else{
				KeyD_Color=new Color(Key_Red.get(),Key_Green.get(),Key_Blue.get(),Key_Alpha.get());
			}
		}
		if(Mouse.isButtonDown(0)){
			if(KeyDown_Rainbow.get()){
				KeyLMB_Color=setAlpha(ColorUtils.rainbow(KeyDown_Rainbow_Offset.get()),KeyDown_Alpha.get())
			}else{
				KeyLMB_Color=new Color(KeyDown_Red.get(),KeyDown_Green.get(),KeyDown_Blue.get(),KeyDown_Alpha.get());
			}
		}else{
			if(Key_Rainbow.get()){
				KeyLMB_Color=setAlpha(ColorUtils.rainbow(Key_Rainbow_Offset.get()),Key_Alpha.get())
			}else{
				KeyLMB_Color=new Color(Key_Red.get(),Key_Green.get(),Key_Blue.get(),Key_Alpha.get());
			}
		}
		if(Mouse.isButtonDown(1)){
			if(KeyDown_Rainbow.get()){
				KeyRMB_Color=setAlpha(ColorUtils.rainbow(KeyDown_Rainbow_Offset.get()),KeyDown_Alpha.get())
			}else{
				KeyRMB_Color=new Color(KeyDown_Red.get(),KeyDown_Green.get(),KeyDown_Blue.get(),KeyDown_Alpha.get());
			}
		}else{
			if(Key_Rainbow.get()){
				KeyRMB_Color=setAlpha(ColorUtils.rainbow(Key_Rainbow_Offset.get()),Key_Alpha.get())
			}else{
				KeyRMB_Color=new Color(Key_Red.get(),Key_Green.get(),Key_Blue.get(),Key_Alpha.get());
			}
		}
		if(Keyboard.isKeyDown(Keyboard.KEY_SPACE)){
			if(KeyDown_Rainbow.get()){
				KeySpace_Color=setAlpha(ColorUtils.rainbow(KeyDown_Rainbow_Offset.get()),KeyDown_Alpha.get())
			}else{
				KeySpace_Color=new Color(KeyDown_Red.get(),KeyDown_Green.get(),KeyDown_Blue.get(),KeyDown_Alpha.get());
			}
		}else{
			if(Key_Rainbow.get()){
				KeySpace_Color=setAlpha(ColorUtils.rainbow(Key_Rainbow_Offset.get()),Key_Alpha.get())
			}else{
				KeySpace_Color=new Color(Key_Red.get(),Key_Green.get(),Key_Blue.get(),Key_Alpha.get());
			}
		}
		if(Text_Rainbow.get()){
			Text_Color=ColorUtils.rainbow(Text_Rainbow_Offset.get())
		}else{
			Text_Color=new Color(Text_Red.get(),Text_Green.get(),Text_Blue.get());
		}
		if(Border.get()){
			if(Border_Rainbow.get()){
				Border_Color=setAlpha(ColorUtils.rainbow(Border_Rainbow_Offset.get()),Border_Alpha.get())
			}else{
				Border_Color=new Color(Border_Red.get(),Border_Green.get(),Border_Blue.get(),Border_Alpha.get());
			}
		}
	}
	
	this.onRender2D=function(){
		var mx=PosX.get();
		var my=PosY.get();
		var mm=Key_Margin.get();
		var ms=Scale.get()-1;
		
		var colorW=KeyW_Color;
		var colorA=KeyA_Color;
		var colorS=KeyS_Color;
		var colorD=KeyD_Color;
		var colorLMB=KeyLMB_Color;
		var colorRMB=KeyRMB_Color;
		var colorSpace=KeySpace_Color;
		var colorText=Text_Color.getRGB();
		
		var wx1=mx+20-(ms*20),wy1=my+0-mm-(ms*20)-(ms*20)-(ms*20)
		var wx2=mx+40+(ms*20),wy2=my+20-mm+(ms*20)-(ms*20)-(ms*20)
		drawRect(wx1,wy1,wx2,wy2,colorW);//W
		
		var ax1=mx+0-mm-(ms*20)-(ms*20)-(ms*20),ay1=my+20-(ms*20)
		var ax2=mx+20-mm+(ms*20)-(ms*20)-(ms*20),ay2=my+40+(ms*20)
		drawRect(ax1,ay1,ax2,ay2,colorA);//A
		
		var sx1=mx+20-(ms*20),sy1=my+20-(ms*20)
		var sx2=mx+40+(ms*20),sy2=my+40+(ms*20)
		drawRect(sx1,sy1,sx2,sy2,colorS);//S
		
		var dx1=mx+40+mm-(ms*20)+(ms*20)+(ms*20),dy1=my+20-(ms*20)
		var dx2=mx+60+mm+(ms*20)+(ms*20)+(ms*20),dy2=my+40+(ms*20)
		drawRect(dx1,dy1,dx2,dy2,colorD);//D
		
		var lmbx1=mx+0-mm+0.5-(ms*20)-(ms*20)-(ms*20),lmby1=my+40+mm+(ms*20)
		var lmbx2=mx+30-mm,lmby2=my+55+mm+(ms*20)+(ms*20)
		drawRect(lmbx1,lmby1,lmbx2,lmby2,colorLMB);//LMB
		
		var rmbx1=mx+30+mm,rmby1=my+40+mm+(ms*20)
		var rmbx2=mx+60+mm-0.5+(ms*20)+(ms*20)+(ms*20),rmby2=my+55+mm+(ms*20)+(ms*20)
		drawRect(rmbx1,rmby1,rmbx2,rmby2,colorRMB);//RMB
		
		var spacex1=mx+0-(ms*20)-(ms*20)-(ms*20),spacey1=my+55+mm+mm+(ms*20)+(ms*20)
		var spacex2=mx+60+(ms*20)+(ms*20)+(ms*20),spacey2=my+70+mm+mm+(ms*20)+(ms*20)
		drawRect(spacex1,spacey1,spacex2,spacey2,colorSpace);//Space
		
		if(Border.get()){
			switch(Border_Style.get()){
				case "Inner":
					drawInnerBorder(wx1,wy1,wx2,wy2,Border_Color,Border_Width.get());
					drawInnerBorder(ax1,ay1,ax2,ay2,Border_Color,Border_Width.get());
					drawInnerBorder(sx1,sy1,sx2,sy2,Border_Color,Border_Width.get());
					drawInnerBorder(dx1,dy1,dx2,dy2,Border_Color,Border_Width.get());
					drawInnerBorder(lmbx1,lmby1,lmbx2,lmby2,Border_Color,Border_Width.get());
					drawInnerBorder(rmbx1,rmby1,rmbx2,rmby2,Border_Color,Border_Width.get());
					drawInnerBorder(spacex1,spacey1,spacex2,spacey2,Border_Color,Border_Width.get());
					break;
				case "Outer":
					drawOuterBorder(wx1,wy1,wx2,wy2,0xFFFFFFFF,Border_Width.get());
					break;
			}
		}
		//GL11.glPushMatrix();
		//GL11.glScalef(0.8,0.8,0.8);
		//GL11.glScaled(0.8,0.8,0.8)
		if(Text_WithShadow.get()){
			mc.fontRendererObj.drawStringWithShadow("W",wx1+(wx2-wx1)*0.5-2,wy1+(wy2-wy1)*0.5-2,colorText);
			mc.fontRendererObj.drawStringWithShadow("A",ax1+(ax2-ax1)*0.5-2,ay1+(ay2-ay1)*0.5-2,colorText);
			mc.fontRendererObj.drawStringWithShadow("S",sx1+(sx2-sx1)*0.5-2,sy1+(sy2-sy1)*0.5-2,colorText);
			mc.fontRendererObj.drawStringWithShadow("D",dx1+(dx2-dx1)*0.5-2,dy1+(dy2-dy1)*0.5-2,colorText);
			mc.fontRendererObj.drawStringWithShadow("LMB",lmbx1+(lmbx2-lmbx1)*0.5-8,lmby1+(lmby2-lmby1)*0.5-2,colorText);
			mc.fontRendererObj.drawStringWithShadow("RMB",rmbx1+(rmbx2-rmbx1)*0.5-8,rmby1+(rmby2-rmby1)*0.5-2,colorText);
			mc.fontRendererObj.drawStringWithShadow("Space",spacex1+(spacex2-spacex1)*0.5-14,spacey1+(spacey2-spacey1)*0.5-2,colorText);
		}else{
			mc.fontRendererObj.drawString("W",wx1+(wx2-wx1)*0.5-2,wy1+(wy2-wy1)*0.5-2,colorText);
			mc.fontRendererObj.drawString("A",ax1+(ax2-ax1)*0.5-2,ay1+(ay2-ay1)*0.5-2,colorText);
			mc.fontRendererObj.drawString("S",sx1+(sx2-sx1)*0.5-2,sy1+(sy2-sy1)*0.5-2,colorText);
			mc.fontRendererObj.drawString("D",dx1+(dx2-dx1)*0.5-2,dy1+(dy2-dy1)*0.5-2,colorText);
			mc.fontRendererObj.drawString("LMB",lmbx1+(lmbx2-lmbx1)*0.5-8,lmby1+(lmby2-lmby1)*0.5-2,colorText);
			mc.fontRendererObj.drawString("RMB",rmbx1+(rmbx2-rmbx1)*0.5-8,rmby1+(rmby2-rmby1)*0.5-2,colorText);
			mc.fontRendererObj.drawString("Space",spacex1+(spacex2-spacex1)*0.5-14,spacey1+(spacey2-spacey1)*0.5-2,colorText);
		}
		//GL11.glScaled(1.0,1.0,1.0)
		//GL11.glScalef(1,1,1);
		//GL11.glPopMatrix();
	}
	
	
	this.addValues=function(values){
		values.add(PosX);
		values.add(PosY);
		values.add(Scale);
		
		values.add(Key_Margin);
		
		values.add(Key_Red);
		values.add(Key_Green);
		values.add(Key_Blue);
		values.add(Key_Alpha);
		values.add(Key_Rainbow);
		values.add(Key_Rainbow_Offset);
		
		values.add(KeyDown_Red);
		values.add(KeyDown_Green);
		values.add(KeyDown_Blue);
		values.add(KeyDown_Alpha);
		values.add(KeyDown_Rainbow);
		values.add(KeyDown_Rainbow_Offset);
		
		values.add(Text_Red);
		values.add(Text_Green);
		values.add(Text_Blue);
		values.add(Text_Rainbow);
		values.add(Text_Rainbow_Offset);
		values.add(Text_WithShadow);
		
		values.add(Border);
		values.add(Border_Style);
		values.add(Border_Width);
		values.add(Border_Red);
		values.add(Border_Green);
		values.add(Border_Blue);
		values.add(Border_Alpha);
		values.add(Border_Rainbow);
		values.add(Border_Rainbow_Offset);
		
	}
};

var ModMain=new ModMain();
var ModClient;

function onLoad(){};
function onEnable(){
	ModClient=moduleManager.registerModule(ModMain);
};
function onDisable(){
	moduleManager.unregisterModule(ModClient);
};

//}catch(er){chat.print(er)}