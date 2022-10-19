---
sidebar_position: 2
---


# Paillier

*** A low-level optimized implementation of the Paillier cryptosystem ***

:::tip 主要依据的论文

Ma H, Han S, Lei H. Optimized Paillier's Cryptosystem with Fast Encryption and Decryption[C]//Annual Computer Security Applications Conference. 2021: 106-118.

:::


:::tip 💐 致谢

 感谢蚂蚁集团 Huanyu ma ，阿里巴巴双子座实验室 Cheng Hong 在实现、优化过程中的帮助与指导。

:::

## c++ API

### opt_paillier_keygen
该函数实现了改良的密钥生成逻辑，支持高效地生成112 bit安全级别的密钥对。

### opt_paillier_set_plaintext, opt_paillier_get_plaintext
 set函数实现了正负整数向明文域的编码。get函数实现了明文域向整数的编码。

### opt_paillier_encrypt
实现了无需私钥参与的加密算法，

### opt_paillier_encrypt_crt
在加密方使用自己的公钥加密时，可调用需私钥参与的基于中国剩余定理的加密优化实现。

### opt_paillier_encrypt_crt_fb
基于fixed-base优化算法，设置了滑动窗口大小为4 bit，同时使用了中国剩余定理优化，可进一步提升加密效率。

### opt_paillier_decrypt
实现了Paillier解密算法

### opt_paillier_decrypt_crt
实现了基于中国剩余定理的解密优化算法，此外在合数模分解之上实现了指数优化算法。

### opt_paillier_add
实现了同态加法，需传入两个密文，输出同态加法的密文结果。

### opt_paillier_constant_mul
实现了常量乘法，其中op1是密文，op2是明文，输出op2乘以op1加密的明文的密态结果。

### opt_paillier_freepubkey，opt_paillier_freeprvkey
内存资源的释放接口。

## Python API
### opt_paillier_c2py_warpper

##### class Opt_paillier_public_key(object)

> Opt Paillier公钥类：存储公钥的信息。

##### class Opt_paillier_secret_key(object)

> Opt Paillier私钥类：存储私钥的信息。

##### class Opt_paillier_ciphertext(object)

> Opt Paillier密文类：存储密文的信息。

##### function opt_paillier_keygen(k_sec)

> 公私钥对生成函数
>
> **Parameters**：k_sec - 加密标识，默认为112
> 
> **Returns**：
> 
> pub - Opt_paillier_public_key
> 
> prv - Opt_paillier_secret_key 

##### function opt_paillier_encrypt_crt(pub, prv, plain_text)

>CRT加密函数：该加密函数会同时使用公私钥优化加密过程
>
>**Parameters**：
> pub - Opt_paillier_public_key, 
> 
> prv - Opt_paillier_secret_key, 
> 
> plain_text - int 最大支持2048位
>
>**Returns**：
> 
> cipher_text - Opt_paillier_ciphertext

##### function opt_paillier_encrypt(pub, plain_text)

> 加密函数：使用公钥加密明文plain_text
> **Parameters**：
> pub - Opt_paillier_public_key
> 
> plain_text - int 最大支持2048位
> **Returns**：cipher_text - Opt_paillier_ciphertext 

##### function opt_paillier_decrypt_crt(pub, prv, cipher_text):

> 解密函数：同时使用公私钥解密密文
> **Parameters**：
> 
> pub - Opt_paillier_public_key
> 
> prv - Opt_paillier_secret_key
> 
> cipher_text- Opt_paillier_ciphertext
> **Returns**：decrypt_text_num - int 解密出来的整型明文

##### function opt_paillier_add(pub, op1_cipher_text, op2_cipher_text)

> 密文加法函数：计算两个密文的同态加法
> **Parameters**：
> 
> pub - Opt_paillier_public_key
> 
> op1_cipher_text - Opt_paillier_ciphertext
> 
> op2_cipher_text- Opt_paillier_ciphertext
> 
> **Returns**：add_res_cipher_text - Opt_paillier_ciphertext 两个密文的同态加结果的密文

##### opt_paillier_c2py_test.py

*** opt_paillier_c2py_warpper的python调用demo ***

```bash
cd {your location}/primihub
bazel build --config=linux :opt_paillier_c2py_test // 编译opt_paillier_c2py_warpper调用demo
bazel-bin/opt_paillier_c2py_test // 运行demo
```

demo执行结果实例

```bash
==================KeyGen is finished==================
KeyGen costs: 565.9785270690918 ms.
=========================opt test=========================
The avg encrypt_crt  cost is 1.5224823951721191 ms.
The avg encryption   cost is 4.612508535385132 ms.
The avg add_cost     cost is 0.7267651557922363 ms.
The avg decrypt_cost cost is 1.9465057849884033 ms.
checked: [1, 1, 1, 1]
========================================================
```

### opt_paillier_pack_c2py_warpper

##### class Opt_paillier_pack_ciphertext(object)

>	Opt Paillier包密文类：存储包密文的信息。将多条明文打包，然后加密得到一个密文，称该密文为包密文。
> 
>	Attributes：	
> ciphertexts - 密文列表。由于Opt Paillier的密文域有限，当明文数量超过阈值时，实际加
> 得到的是密文列表。
>
> pack_size - 该包密文含有的明文数量
>
> crtMod - 密文打包参数

##### function **opt_paillier_pack_encrypt_crt**(pub, prv, plain_text_list, crt_mod = None):
> CRT打包加密函数：该加密函数会同时使用公私钥优化打包加密过程。多条明文会加密到一个包密文中。
>  **Parameters**：
> 
> pub - Opt_paillier_public_key
> 
> prv - Opt_paillier_secret_key
> 
> plain_text_list - 打包加密的明文列表，每个明文都是int类型，每个int最大可为70bit
> 
> crt_mod - 包密文打包参数，若提供则使用所传入打包参数进行明文的打包与加密，否则使用一个随机的crt_mod
>
> **Returns**：
> 
> pack_ciphertext - Opt_paillier_pack_ciphertext 包密文。若传入了crt_mod，则pack_ciphertext.crtMod=crt_mod。

##### function opt_paillier_pack_encrypt(pub, plain_text_list, crt_mod = None):

> 
> 打包加密函数：该加密函数使用公钥对一批明文进行打包加密。一批中的多条明文会加密到一个包密文中。
> 
> **Parameters**：
> 
> pub - Opt_paillier_public_key
> 
> plain_text_list - 打包加密的明文列表，每个明文都是int类型，每个int最大可为70bit
> 
> crt_mod - 包密文打包参数，若提供则使用所传入打包参数进行明文的打包与加密，否则使用一个随机的crt_mod
> 
> **Returns**：
> 
> pack_ciphertext - Opt_paillier_pack_ciphertext 包密文。若传入了crt_mod，则pack_ciphertext.crtMod=crt_mod。

##### function opt_paillier_pack_decrypt_crt(pub, prv, pack_cipher_text)

> 包解密函数：同时使用公私钥解密包密文
> 
> **Parameters**：
> 
> pub - Opt_paillier_public_key
> 
> prv - Opt_paillier_secret_key
> 
> pack_cipher_text - Opt_paillier_pack_ciphertext
> 
> **Returns**：decrypt_text_num_list - list 解密出来的整型明文列表

##### function opt_paillier_pack_add(pub, op1_pack_cipher_text, op2_pack_cipher_text)

> 包密文加法函数：计算两个包密文的同态加法。传入的两个Opt_paillier_pack_ciphertext应拥有相同的pack_size以及crtMod。两个   	Opt_paillier_pack_ciphertext包内相同位置的数会相加。
> 
>**Parameters**：
> 
> pub - Opt_paillier_public_key
> 
> op1_pack_cipher_text - Opt_paillier_pack_ciphertext
> 
> op2_pack_cipher_text - Opt_paillier_pack_ciphertext
> 
>**Returns**：add_res_cipher_text - Opt_paillier_pack_ciphertext两个包密文的同态加结果的包密文

##### opt_paillier_pack_c2py_test.py

opt_paillier_pack_c2py_warpper的python调用demo

```bash
cd {your location}/primihub
bazel build --config=linux :opt_paillier_pack_c2py_test // 编译opt_paillier_pack_c2py_warpper调用demo
bazel-bin/opt_paillier_pack_c2py_test // 运行demo
```

demo执行结果实例

```bash
==================KeyGen is finished==================
KeyGen costs: 886.4307403564453 ms.
=========================opt test=========================
The avg encryption cost is 91.69797420501709 ms.
The avg decryption cost is 46.557745933532715 ms.
The avg addition   cost is 1.897873878479004 ms.
========================================================
```
