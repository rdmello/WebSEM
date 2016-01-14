// Rylan Dmello
// Jan 8 2015
// Support functions for matrix ops

"use strict";

function log(msg) {
    var out_text = document.getElementById("debug");
    out_text.innerHTML+=msg;
}

function create_matrix(m, n) {
    var temp = new Array(m);
    for (var i=0; i<m; i++) {
        temp[i] = new Array(n);
    }
    return temp;
}

function init_zero(mat, m, n) {
    for (var i=0; i<m; i++){
        for (var j=0; j<n; j++) {
            mat[i][j] = 0.0;
        }
    }
}

function init_spec(mat, m, n) {
    for (var i=0; i<m; i++){
        for (var j=0; j<n; j++) {
            mat[i][j] = 2.0*i+j;
        }
    }
}

function init_rand(mat, m, n) {
    for (var i=0; i<m; i++){
        for (var j=0; j<n; j++) {
            mat[i][j] = Math.random();
        }
    }
}

function init_single(mat, m, n, val) {
    for (var i=0; i<m; i++){
        for (var j=0; j<n; j++) {
            mat[i][j] = val;
        }
    }
}

function print_matrix(mat, m, n){
    var mystr = "";
    for (var i=0; i<m; i++){
        mystr+="<br/>";
        for (var j=0; j<n; j++) {
            mystr+=" "+Math.round(mat[i][j])+" ";
        }
    }
    log(mystr);
}

function multiply_matrix(mat1, mat2, m, n, p) {
    var temp = 0.0;
    var mat3 = create_matrix(m, p);
    for (var i=0; i<m; i++){
        for (var j=0; j<p; j++) {
            temp = 0.0;
            for (var k=0; k<n; k++) {
                temp += mat1[i][k]*mat2[k][j];
            }
            mat3[i][j]=temp;
        }
    }
    return mat3;
}

function duplicate_matrix(mat, m, n) {
    var mat2 = create_matrix(m, n);
    for (var i=0; i<m; i++){
        for (var j=0; j<n; j++) {
            mat2[i][j] = mat[i][j];
        }
    }
    return mat2;
}

function canvas_map(mat, m, n, minval, maxval) {
    var r = document.getElementById("display");
    var s = r.getContext("2d");
    var h=r.height, w=r.width; 
    var dh=Math.floor(h/m), dw=Math.floor(w/n);
    var val = 0;
    for (var i=0; i<m; i++){
        for (var j=0; j<n; j++) {
            val = ((mat[i][j]-minval)/(maxval-minval));
            s.fillStyle = "rgb("+Math.floor(255*val)+",1,"+Math.floor(255*(1-val))+")";
            s.fillRect(i*dw,j*dh,dw,dh);
        }
    }
}

function canvas_map_hd(mat, m, n, minval, maxval) {
    var r = document.getElementById("display");
    var s = r.getContext("2d");
    var h=r.height, w=r.width; 
    var dh=4, dw=4;
    m = m-2; n = n-2;
    var nh=Math.floor(h/dh); var nw = Math.floor(w/dw);
    var val = 0, matval = 0, myx = 0, myy = 0, myxf=0, myyf=0, matvalxp=0, matvalxm=0;
    var matvalyp, matvalym, matvalx, matvaly;
    for (var i=0; i<nw; i++){
        for (var j=0; j<nh; j++) {
            myx = 1+(i*m/nw); myy = 1+(j*n/nh);
            myxf = Math.floor(myx); myyf = Math.floor(myy);
            matval = mat[myxf][myyf];
            matvalxp = mat[1+myxf][myyf]; matvalyp = mat[myxf][myyf+1];
            matvalxm = mat[-1+myxf][myyf]; matvalym = mat[myxf][myyf-1];
            if (myx<myxf+0.5) {
                matvalx = matvalxm+((myx-(myxf-0.5))*(matval-matvalxm));
            }
            else {
                matvalx = matval+((myx-(myxf+0.5))*(matvalxp-matval));
            }
            if (myy<myyf+0.5) {
                matvaly = matvalym+((myy-(myyf-0.5))*(matval-matvalym));
            }
            else {
                matvaly = matval+((myy-(myyf+0.5))*(matvalyp-matval));
            }
            matval = (matvalx+matvaly)/2;
            val = (matval-minval)/(maxval-minval);
            s.fillStyle = "rgb("+Math.floor(255*val)+",1,"+Math.floor(255*(1-val))+")";
            s.fillRect(i*dw,j*dh,dw,dh);
        }
    }
}

function initialize_canvas() {
    var r = document.getElementById("display");
    r.height = window.innerHeight;
    r.width = window.innerWidth;
}


