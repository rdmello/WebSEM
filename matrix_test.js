// Rylan Dmello
// 2016-01-08
// WebSEM matrix test

"use strict";

function main() {
    var m = 3, n = 4, p = 5;
    
    var mymat1 = create_matrix(m, n);
    var mymat2 = create_matrix(n, p);
    
    init_spec(mymat1, m, n);
    init_spec(mymat2, n, p);
    
    log("<br/>My matrix's value is: ");
    print_matrix(mymat1, m, n);
    log("<br/>My matrix's value is: ");
    print_matrix(mymat2, n, p);

    var mymat3 = multiply_matrix(mymat1, mymat2, m, n, p);
    log("<br/><br/>The product of the above two matrices is: ");
    print_matrix(mymat3, m, p);

    log("<br/><br/>- - - End of Matrix Test - - -");
}

