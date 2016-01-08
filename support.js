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
    for (var i=0; i<m; i++){
        log("<br/>");
        for (var j=0; j<n; j++) {
            log(" "+Math.round(mat[i][j])+" ");
        }
    }
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
