$(document).ready(()=>{
    const canvas = document.getElementById('mycanvas');
    const w = window.innerWidth-3;
    const h = window.innerHeight/2;

    wr = w*0.1;
    hr = h*0.2;
    xr = (w*0.5) - (0.5*wr);
    yr = (h*0.5) - (0.5*hr);
  
    r = hr*0.5;
    yc = yr + (0.5*hr);
    xc1 = xr+1;
    xc2 = xr + wr - 1;

    canvas.width = w;
    canvas.height = h;

    const ctx = canvas.getContext("2d");

    grayBar=(color)=>{
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.fillRect(xr,yr,wr,hr);
    
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(xc1,yc,r,0.5*Math.PI,1.5*Math.PI);
        ctx.fill();
        
        ctx.fillStyle = color;
        ctx.beginPath();
        ctx.arc(xc2,yc,r,1.5*Math.PI,0.5*Math.PI);
        ctx.fill();
    }

    grayBar("gray");

    $("#reset").click(()=>{grayBar('gray')});

    var err_triggegreen = false;
    $("#go").click(()=>{
        var input = document.getElementById('percentage').value;
        document.getElementById('percentage').value = "";
        const err = document.getElementById('err');
        input = parseFloat(input);
        if(isNaN(input) === true || typeof(input) !== "number"){
            err.classList.remove('error');
            err_triggegreen = true;
        }else{
            if(err_triggegreen === true){
                err.classList.add('error');
                err_triggegreen = false;
            }
            input = Math.round(input*100)/10000;

            if(input > 1){
                input = 1;
            }else if(input < 0){
                input = 0;
            };
            var barLength = wr + (r*2);
            var fillLength = barLength * input;
            if(fillLength <= r){
                var theta = Math.acos((r-fillLength)/r);
                var alpha = Math.PI - theta;
                var phi = alpha+ (2 * theta);
                ctx.fillStyle = "green";
                ctx.beginPath();
                ctx.arc(xc1,yc,r,alpha,phi);
                ctx.fill();
            }else if(fillLength <= r + wr ){
                ctx.fillStyle = "green"
                ctx.beginPath();
                ctx.arc(xc1,yc,r,0.5*Math.PI,1.5*Math.PI);
                ctx.fill();
                
                ctx.fillStyle = "green"
                ctx.beginPath();
                ctx.fillRect(xr,yr,fillLength-r,hr);
                
            }else if(fillLength < barLength){
                var L = fillLength-r-wr
                var newR=(Math.pow(L, 2)+Math.pow(hr/2, 2))/(2*L);
                var theta = Math.atan((hr/2)/(newR-L));
                var newX=xc2-(newR-L);
                var alpha = (2*Math.PI) - theta;
                var phi = theta

                console.log(theta, xc2, newX, newR, r, alpha, phi)

                ctx.fillStyle = "green"
                ctx.beginPath();
                ctx.fillRect(xr,yr,wr,hr);
            
                ctx.fillStyle = "green"
                ctx.beginPath();
                ctx.arc(xc1,yc,r,0.5*Math.PI,1.5*Math.PI);
                ctx.fill();

                ctx.fillStyle = "green"
                ctx.beginPath();
                ctx.arc(newX,yc,newR,alpha,phi);
                ctx.fill();
            }else{
                grayBar("green");
            }
            
        }
    })
})
