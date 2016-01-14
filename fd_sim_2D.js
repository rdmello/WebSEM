// Rylan Dmello
// 2016-01-08
// WebSEM Finite Difference Method test 2D
// Diffusion Problem:
// (1) Domain: 2D, with x and y: 0 m to 1 m.
// (2) Initial Condition: Domain initialized with T = 373 K;
// (3) Boundary Condition: T = 273 K; 
// (4) Governing Equation: Diffusion: dT/dt = alpha*(d2T/dx2+d2T/dy2); 
// (5) Thermal Diffusivity, alpha: 1.27*(10^-4) m2/s;
// (6) To find: time to reach Steady State. 
// (7) Also plot the max temp vs time

"use strict";

function fd_sim_2D_main() {
    
    initialize_canvas();
    // Discretization variables
    var m_int = 100, n_int = 100; var m=m_int+2, n=n_int+2; 
    // Problem variables
    var alpha=1.27e-4; // m2/s
    var T_edge = 273; // K
    var T_init = 373; // K
    var x_min=0, x_max=1, y_min=0, y_max=1; // meters
    var dx=(x_max-x_min)/m_int; log("dx is "+dx);
    var dy=(y_max-y_min)/n_int;
    var dt = 0.1; // seconds ARBITRARY
    var maxiter = 10000;
    var numiter = 100;
    var plottime=100;

    var Ti = create_matrix(m, n); 
    init_single(Ti, m, n, T_init); //Initial Temp
    for (var j=0; j<n; j++) {
        Ti[0][j]=T_edge;
        Ti[m-1][j]=T_edge;
    }

    for (var i=0; i<m; i++) {
        Ti[i][0]=T_init;
        Ti[i][n-1]=T_init;
    }

    log("<br/>Scaling Factor is: " +alpha*dt/dx/dx);
    log("<br/>Initialization Complete. IC (incl. boundary) is: ");
    canvas_map_hd(Ti, m, n, 273, 373);
    //print_matrix(Ti, m, n);

    var T = duplicate_matrix(Ti, m, n);
    var Tb = duplicate_matrix(Ti, m, n);
    var t0 = performance.now();
    var t1 = performance.now();
    var mult = alpha*dt/dx/dx;

    function main_iterator(stage) {
        stage = stage+1;
        for (var iter=0; iter<numiter; iter++) {
            for (var i=1; i<m-1; i++){
                for (var j=1; j<n-1; j++){
                    T[i][j]=Tb[i][j]+(mult*(Tb[i+1][j]+Tb[i-1][j]+Tb[i][j+1]+Tb[i][j-1]-(4*Tb[i][j])));
                }
            }
            Tb = duplicate_matrix(T, m, n);
        }
        log("<br/>In stage "+stage);
        canvas_map_hd(T, m, n, 273, 373);
        if(stage<Math.floor(maxiter/numiter)) {
            setTimeout(function(){main_iterator(stage)}, plottime);
        } else {
            t1 = performance.now();
            log("<br/>Simulation Completed");
            log("<br/>Time taken for "+maxiter+" iterations is: "+(t1-t0)+" milliseconds.");
            log("<br/><br/>----- End of 2D Finite Difference Test -----");
        }
    }

    setTimeout(function(){main_iterator(0)}, plottime);
}

