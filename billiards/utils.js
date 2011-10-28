/**
 * Created by gmp26.
 * Date: 30/09/2011
 * Time: 11:11
 * from: http://www.math.ucla.edu/~tom/distributions/beta.html
 */

goog.provide('billiards.utils');

/**
 * logGamma function
 * @param {number} Z
 * @return {number}
 */
billiards.utils.logGamma = function (Z) {
	//with (Math) {
	var S=1+76.18009173/Z-86.50532033/(Z+1)+24.01409822/(Z+2)-1.231739516/(Z+3)+.00120858003/(Z+4)-.00000536382/(Z+5);
	var LG= (Z-.5)*Math.log(Z+4.5)-(Z+4.5)+Math.log(S*2.50662827465);
	//}
	return LG
}


/**
 * incomplete Beta function
 * @param {number} X
 * @param {number} A
 * @param {number} B
 * @return {number}
 */
billiards.utils.betaInc = function(X,A,B) {
	var A0=0;
	var B0=1;
	var A1=1;
	var B1=1;
	var M9=0;
	var A2=0;
	var C9;
	while (Math.abs((A1-A2)/A1)>.00001) {
		A2=A1;
		C9=-(A+M9)*(A+B+M9)*X/(A+2*M9)/(A+2*M9+1);
		A0=A1+C9*A0;
		B0=B1+C9*B0;
		M9=M9+1;
		C9=M9*(B-M9)*X/(A+2*M9-1)/(A+2*M9);
		A1=A0+C9*A1;
		B1=B0+C9*B1;
		A0=A0/B1;
		B0=B0/B1;
		A1=A1/B1;
		B1=1;
	};
	return A1/A;
}

/**
 * compute beta distribution pdf
 * @param {number} Z
 * @param {number} A
 * @param {number} B
 * @return {number}
 */
billiards.utils.betaCDF = function (Z, A, B) {
    var cdf;
    if (A<=0) {
        throw({name:'betaCDF', message:"alpha must be positive"});
    } else if (B<=0) {
        throw({name:'betaCDF', message:"beta must be positive"});
    } else if (Z<=0) {
        cdf=0;
    } else if (Z>=1) {
        cdf=1;
    } else {
        var S=A+B;
        var BT=Math.exp(billiards.utils.logGamma(S)-billiards.utils.logGamma(B)-billiards.utils.logGamma(A)+A*Math.log(Z)+B*Math.log(1-Z));
        if (Z<(A+1)/(S+2)) {
            cdf=BT*billiards.utils.betaInc(Z,A,B);
        } else {
            cdf=1-BT*billiards.utils.betaInc(1-Z,B,A);
        }
    }
    return cdf;
}

