# Mathematical Concerns

This article is intended to capture and preserve recent investigation effort 
related to mathematical difficulties that produce values of infinity and NaN.

### Captured from Slack discussion:

Tracing where NaN comes from in compression spring eqnset.js 
when OD_Free = 0.4 and Wire_Dia = 0.2  

Line 19  
    x[o.Spring_Index] = x[o.Mean_Dia] / p[o.Wire_Dia];  
 = 1.0  
 
Line 21  
    kc = (4.0 * x[o.Spring_Index] - 1.0) / (4.0 * x[o.Spring_Index] - 4.0);  
= infinity  

line 23  
    ks = kc + 0.615 / x[o.Spring_Index];  
= infinity  

line 52  
      s_f = ks * 8.0 * x[o.Mean_Dia] / (Math.PI * p[o.Wire_Dia] * p[o.Wire_Dia] * p[o.Wire_Dia]);  
= infinity  

line 54, 55  
    x[o.Stress_1] = s_f * p[o.Force_1];  
    x[o.Stress_2] = s_f * p[o.Force_2];  
= infinity  

line 88  
      stress_rng = (x[o.Stress_2] - x[o.Stress_1]) / 2.0;  
= NaN  

line 90  
    x[o.FS_CycleLife] =  x[o.Stress_Lim_Stat] /  
         (kc * stress_rng * (x[o.Stress_Lim_Stat] - se2) / se2 + stress_avg);  
= NaN  

Conclusion:  
Doing math involving multiple infinities gets NaN which then propagates.  

### Javascript specification

This specification provides detail on the exact operations that produce values of infinity and NaN.

See:  
[Javascript specification](https://tc39.es/ecma262/multipage/ecmascript-data-types-and-values.html#sec-ecmascript-language-types-number-type)

### See also:
Github issue #870 Add eqnset tests for pathological cases  
