var documenterSearchIndex = {"docs":
[{"location":"symbolicnumericintegration/#API","page":"API","title":"API","text":"","category":"section"},{"location":"symbolicnumericintegration/","page":"API","title":"API","text":"integrate","category":"page"},{"location":"symbolicnumericintegration/#SymbolicNumericIntegration.integrate","page":"API","title":"SymbolicNumericIntegration.integrate","text":"integrate is the main entry point\n\ninput:\n------\neq: a Symbolics expression to integrate\nx: the independent variable (optional)\n\nabstol: the desired tolerance\nnum_steps: the number of different steps with expanding basis to be tried\nnum_trials: the number of trials in each step (no changes to the basis)\nradius: the radius of the disk in the complex plane to generate random test points\nshow_basis: if true, the basis (list of candidate terms) is printed\nopt: the sparse regression optimizer\nbypass: if true, do not integrate terms separately but consider all at once\nsymbolic: try symbolic integration first\nmax_basis: the maximum number of candidate terms to consider\nverbose: print a detailed report\ncomplex_plane: generate random test points on the complex plane (if false, the points will be on real axis)\nhomotopy: use the homotopy algorithm to generate the basis\nuse_optim: use Optim.jl `minimize` function instead of the STLSQ algorithm (**experimental**)\n\noutput:\n-------\nsolved, unsolved, err\n\nsolved is the solved integral and unsolved is the residual unsolved portion of the input\nerr is the numerical error in reaching the solution\n\n\n\n\n\n","category":"function"},{"location":"#SymbolicNumericIntegration.jl","page":"Home","title":"SymbolicNumericIntegration.jl","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"SymbolicNumericIntegration.jl is a hybrid symbolic/numerical integration package that works on the Julia Symbolics expressions.","category":"page"},{"location":"","page":"Home","title":"Home","text":"SymbolicNumericIntegration.jl uses a randomized algorithm based on a hybrid of the method of undetermined coefficients and sparse regression and can solve a large subset of basic standard integrals (polynomials, exponential/logarithmic, trigonometric and hyperbolic, inverse trigonometric and hyperbolic, rational and square root). The basis of how it works and the theory of integration using the Symbolic-Numeric methods refer to Basis of Symbolic-Numeric Integration.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Function integrate returns the integral of a univariate expression with constant real or complex coefficients. integrate returns a tuple with three values. The first one is the solved integral, the second one is the sum of the unsolved terms, and the third value is the residual error. If integrate is successful, the unsolved portion is reported as 0.","category":"page"},{"location":"#Installation","page":"Home","title":"Installation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"To install SymbolicNumericIntegration.jl, use the Julia package manager:","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Pkg\nPkg.add(\"SymbolicNumericIntegration\")","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Symbolics\nusing SymbolicNumericIntegration\n\n@variables x","category":"page"},{"location":"","page":"Home","title":"Home","text":"julia> integrate(3x^3 + 2x - 5)\n(x^2 + (3//4)*(x^4) - (5x), 0, 0)\n\njulia> integrate((5 + 2x)^-1)\n((1//2)*log((5//2) + x), 0, 0.0)\n\njulia> integrate(1 / (6 + x^2 - (5x)))\n(log(x - 3) - log(x - 2), 0, 3.339372764128952e-16)\n\njulia> integrate(1 / (x^2 - 16))\n((1//8)*log(x - 4) - ((1//8)*log(4 + x)), 0, 1.546926788028958e-16)\n\njulia> integrate(x^2 / (16 + x^2))\n(x + 4atan((-1//4)*x), 0, 1.3318788420751984e-16)\n\njulia> integrate(x^2 / sqrt(4 + x^2))\n((1//2)*x*((4 + x^2)^0.5) - ((2//1)*log(x + sqrt(4 + x^2))), 0, 8.702422633074313e-17)\n\njulia> integrate(x^2 * log(x))\n((1//3)*log(x)*(x^3) - ((1//9)*(x^3)), 0, 0)\n\njulia> integrate(x^2 * exp(x))\n(2exp(x) + exp(x)*(x^2) - (2x*exp(x)), 0, 0)\n\njulia> integrate(tan(2x))\n((-1//2)*log(cos(2x)), 0, 0)\n\njulia> integrate(sec(x) * tan(x))\n(cos(x)^-1, 0, 0)\n\njulia> integrate(cosh(2x) * exp(x))\n((2//3)*exp(x)*sinh(2x) - ((1//3)*exp(x)*cosh(2x)), 0, 7.073930088880992e-8)\n\njulia> integrate(cosh(x) * sin(x))\n((1//2)*sin(x)*sinh(x) - ((1//2)*cos(x)*cosh(x)), 0, 4.8956233716268386e-17)\n\njulia> integrate(cosh(2x) * sin(3x))\n(0.153845sinh(2x)*sin(3x) - (0.23077cosh(2x)*cos(3x)), 0, 4.9807620877373405e-6)\n\njulia> integrate(log(log(x)) * (x^-1))\n(log(x)*log(log(x)) - log(x), 0, 0)\n\njulia> integrate(exp(x^2))\n(0, exp(x^2), Inf)    # as expected!","category":"page"},{"location":"","page":"Home","title":"Home","text":"integrate has the form integrate(y; kw...) or integrate(y, x; kw...), where y is the integrand and the optional x is the variable of integration. The keyword parameters are:","category":"page"},{"location":"","page":"Home","title":"Home","text":"abstol (default 1e-6): the error tolerance to accept a solution.\nsymbolic (default true): if true, pure symbolic integration is attempted first.\nbypass (default false): if true, the whole expression is considered at once and not per term.\nnum_steps (default 2): one plus the number of expanded basis to check (if num_steps is 1, only the main basis is checked).\nnum_trials (default 5): the number of attempts to solve the integration numerically for each basis set.\nshow_basis (default false): print the basis set, useful for debugging. Only works if verbose is also set.\nhomotopy (default: true as of version 0.7.0): uses the continuous Homotopy operators to generate the integration candidates.\nverbose (default false): if true, prints extra (and voluminous!) debugging information.\nradius (default 1.0): the starting radius to generate random test points.\nopt (default STLSQ(exp.(-10:1:0))): the optimizer passed to sparse_regression!.\nmax_basis (default 110): the maximum number of expression in the basis.\ncomplex_plane (default true): random test points are generated on the complex plane (only over the real axis if complex_plane is false).\nuse_optim (default false): use Optim.jl minimize function instead of the STLSQ algorithm (experimental)","category":"page"},{"location":"#Testing","page":"Home","title":"Testing","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"test/runtests.jl contains a test suite of 160 easy to moderate test integrals (can be run by calling test_integrals). Currently, SymbolicNumericIntegration.jl solves more than 90% of its test suite.","category":"page"},{"location":"","page":"Home","title":"Home","text":"Additionally, 12 test suites from the Rule-based Integrator (Rubi) are included in the /test directory. For example, we can test the first one as below (Axiom refers to the format of the test files)","category":"page"},{"location":"","page":"Home","title":"Home","text":"using SymbolicNumericIntegration\ninclude(\"test/axiom.jl\")  # note, you may need to use the correct path\n\nL = convert_axiom(:Apostle)   # can also use L = convert_axiom(1)  \ntest_axiom(L, false; bypass = false, verbose = false, homotopy = true)","category":"page"},{"location":"","page":"Home","title":"Home","text":"The test suites description based on the header of the files in the Rubi directory are","category":"page"},{"location":"","page":"Home","title":"Home","text":"name id comment\n:Apostle 1 Tom M. Apostol - Calculus, Volume I, Second Edition (1967)\n:Bondarenko 2 Vladimir Bondarenko Integration Problems\n:Bronstein 3 Manuel Bronstein - Symbolic Integration Tutorial (1998)\n:Charlwood 4 Kevin Charlwood - Integration on Computer Algebra Systems (2008)\n:Hearn 5 Anthony Hearn - Reduce Integration Test Package\n:Hebisch 6 Waldek Hebisch - email May 2013\n:Jeffrey 7 David Jeffrey - Rectifying Transformations for Trig Integration (1997)\n:Moses 8 Joel Moses - Symbolic Integration Ph.D. Thesis (1967)\n:Stewart 9 James Stewart - Calculus (1987)\n:Timofeev 10 A. F. Timofeev - Integration of Functions (1948)\n:Welz 11 Martin Welz - posts on Sci.Math.Symbolic\n:Webster 12 Michael Wester","category":"page"},{"location":"#Citation","page":"Home","title":"Citation","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"If you use SymbolicNumericIntegration.jl, please cite Symbolic-Numeric Integration of Univariate Expressions based on Sparse Regression:","category":"page"},{"location":"","page":"Home","title":"Home","text":"@article{Iravanian2022,   \n   author = {Shahriar Iravanian and Carl Julius Martensen and Alessandro Cheli and Shashi Gowda and Anand Jain and Julia Computing and Yingbo Ma and Chris Rackauckas},\n   doi = {10.48550/arxiv.2201.12468},\n   month = {1},\n   title = {Symbolic-Numeric Integration of Univariate Expressions based on Sparse Regression},\n   url = {https://arxiv.org/abs/2201.12468v2},\n   year = {2022},\n}","category":"page"},{"location":"#Contributing","page":"Home","title":"Contributing","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"Please refer to the SciML ColPrac: Contributor's Guide on Collaborative Practices for Community Packages for guidance on PRs, issues, and other matters relating to contributing to SciML.\nSee the SciML Style Guide for common coding practices and other style decisions.\nThere are a few community forums:\nThe #diffeq-bridged and #sciml-bridged channels in the Julia Slack\nThe #diffeq-bridged and #sciml-bridged channels in the Julia Zulip\nOn the Julia Discourse forums\nSee also SciML Community page","category":"page"},{"location":"#Reproducibility","page":"Home","title":"Reproducibility","text":"","category":"section"},{"location":"","page":"Home","title":"Home","text":"<details><summary>The documentation of this SciML package was built using these direct dependencies,</summary>","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Pkg # hide\nPkg.status() # hide","category":"page"},{"location":"","page":"Home","title":"Home","text":"</details>","category":"page"},{"location":"","page":"Home","title":"Home","text":"<details><summary>and using this machine and Julia version.</summary>","category":"page"},{"location":"","page":"Home","title":"Home","text":"using InteractiveUtils # hide\nversioninfo() # hide","category":"page"},{"location":"","page":"Home","title":"Home","text":"</details>","category":"page"},{"location":"","page":"Home","title":"Home","text":"<details><summary>A more complete overview of all dependencies and their versions is also provided.</summary>","category":"page"},{"location":"","page":"Home","title":"Home","text":"using Pkg # hide\nPkg.status(; mode = PKGMODE_MANIFEST) # hide","category":"page"},{"location":"","page":"Home","title":"Home","text":"</details>","category":"page"},{"location":"","page":"Home","title":"Home","text":"You can also download the \n<a href=\"","category":"page"},{"location":"","page":"Home","title":"Home","text":"using TOML\nversion = TOML.parse(read(\"../../Project.toml\", String))[\"version\"]\nname = TOML.parse(read(\"../../Project.toml\", String))[\"name\"]\nlink = \"https://github.com/SciML/\" * name * \".jl/tree/gh-pages/v\" * version *\n       \"/assets/Manifest.toml\"","category":"page"},{"location":"","page":"Home","title":"Home","text":"\">manifest</a> file and the\n<a href=\"","category":"page"},{"location":"","page":"Home","title":"Home","text":"using TOML\nversion = TOML.parse(read(\"../../Project.toml\", String))[\"version\"]\nname = TOML.parse(read(\"../../Project.toml\", String))[\"name\"]\nlink = \"https://github.com/SciML/\" * name * \".jl/tree/gh-pages/v\" * version *\n       \"/assets/Project.toml\"","category":"page"},{"location":"","page":"Home","title":"Home","text":"\">project</a> file.","category":"page"}]
}
