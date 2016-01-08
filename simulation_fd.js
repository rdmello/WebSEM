// Rylan Dmello
// 2016-01-08
// WebSEM finite difference method test

N = 10;

function create_matrix(m, n) {
    var temp = new Array(m);
    for (var i=0; i<m; i++) {
        temp[i] = new Array(n);
    }
    return temp;
}

function init_zeros(mat, m, n) {
    var temp = mat;
    for (var i=0; i<m; i++){
        for (var j=0; j<n; j++) {
            temp[i][j] = 0;
        }
    }
    return temp;
}

function init_zeros_alt(mat, m, n) {
    for (var i=0; i<m; i++){
        for (var j=0; j<n; j++) {
            mat[i][j] = 0;
        }
    }
}

mymat = create_matrix(2, 3);
mymat = init_zeros(mymat, 2, 3);


