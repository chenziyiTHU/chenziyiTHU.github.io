---
layout: post
title: 《数理统计》终极总结
date: 2026-03-15 20:00:00
description: 《数理统计》终极总结
tags: Mathematics
categories: Mathematics
toc:                      
    sidebar: left 
---

以下全文来自于THU求真书院yf老师2023年秋季学期课程《数理统计》，本人在考试前手写整理了一版复习大纲，考完试后将其转移至此。根据yxk老师的说法，书应该越读越薄，于是希望能够用一篇文章整理数理统计中最重要的一些方法和内容。如有错漏恳请批评指正！

主要参考书目：

1. Peter J. Bickel, Kjell A. Doksum - Mathematical Statistics Basic Ideas and Selected Topics
2. Roger Berger, George Casella - Statistical Inference

---

在本文中，我们将跳过对统计模型和统计量的讨论（包括模型的定义、决策框架、数据简化、指数分布族等），直接进入对统计方法的整理。

## 1. 非渐进方法 (Non-asymptotic Methods)
### 1.1 点估计 (Point Estimate)
点估计的方法主要包括：矩估计、极小差异估计（包括最小二乘估计、极大似然估计）、贝叶斯方法、极小极大方法、一致最小方差无偏估计。

#### 1.1.1  矩估计 (Method of Moments, MOM)
假设参数空间 $\Theta \subset \mathbb{R}^d$ ．对 $X \sim P_\theta$ ，定义其 $j$ 阶矩为 $\mu_j(\theta)=E_\theta[X^j]$ ．假设独立同分布选取 $X_1, \ldots, X_n \sim P_\theta$ ，考虑如下方程：

$$
\left\{\begin{aligned}
\frac{1}{n} \sum_{i=1}^n X_i & =\mu_1(\theta), \\
\frac{1}{n} \sum_{i=1}^n X_i^2 & =\mu_2(\theta), \\
\vdots & \\
\frac{1}{n} \sum_{i=1}^n X_i^d & =\mu_d(\theta) .
\end{aligned}\right.
$$

该方程（组）的解即为 $\theta$ 的**矩估计** $\hat{\theta}_{M O M}$ .
#### 1.1.2 极小差异估计 (Minimum Contrast Estimate, MCE)
函数 $\rho: \mathcal{X} \times \Theta \rightarrow \mathbb{R}$ 被称为**差异函数 (contrast function)**，如果对任意 $\theta_0 \in \Theta$ ，函数 $D\left(\theta_0, \theta\right)=E_{\theta_0}[\rho(X, \theta)]$ 当且仅当 $\theta=\theta_0$ 时取到最小值。

**极小差异估计 (minimum contrast estimate) **定义如下：

$$
\hat{\theta}(X)=\arg \min _{\theta \in \Theta} \rho(X, \theta) .
$$

最小差异估计有如下两种特殊情形：
##### 1.1.2.1 最小二乘估计 (Least Square Estimate, LSE)
对于如下的回归模型 (Regressive model):

$$
Y_i=g\left(\beta, Z_i\right)+\epsilon_i, \quad 1 \leq i \leq n
$$

其中 $\epsilon_i \sim \mathcal{N}\left(0, \sigma^2\right)$ 独立同分布，$g$ 为给定函数，$\beta$ 为参数。

考虑差异函数：

$$
\rho((\mathbf{Y}, \mathbf{Z}), \beta)=\sum_{i=1}^n\left[Y_i-g\left(\beta, Z_i\right)\right]^2 .
$$

此时

$$
D\left(\beta_0, \beta\right)=E_{\beta_0}[\rho((\mathbf{Y}, \mathbf{Z}), \beta)]=n \sigma^2+\sum_{i=1}^n E_{\beta_0}\left[\left(g\left(\beta_0, Z_i\right)-g\left(\beta, Z_i\right)\right)^2\right]
$$

在 $\beta=\beta_0$ 有唯一的最小值当且仅当 $\beta$ 是可识别的 (identifiable). $\hat{\beta}=\arg \min \rho((\mathbf{Y}, \mathbf{Z}), \beta)$ 称为最小二乘估计 (least square estimate).

##### 1.1.2.2 极大似然估计 (Maximum Likelihoood Estimate, MLE)
考虑差异函数

$$
\rho(X, \theta)=-l_X(\theta):=-\log L_X(\theta) .
$$

利用下面的引理我们知道 $\rho$ 满足差异函数的定义：

> ***引理*. (Shannon).** 对任意 $\theta_0, \theta \in \Theta$ ，有
> 
$$
K\left(\theta_0, \theta\right)=-E_{\theta_0}\left[\log \frac{p(x \mid \theta)}{p\left(x \mid \theta_0\right)}\right] \geq 0 .
$$
> 
> $\hat{\theta}_{M L E}=\arg \min \rho(X, \theta)=\arg \max L_X(\theta)$ 称为极大似然估计 (maximum likelihood estimate).

#### 1.1.3 贝叶斯方法（Bayes Procedure）

假设参数空间 $\Theta$ 服从 $\pi$ 先验分布，损失函数 (loss function) 为 $l(\theta, a)$ 。我们通过计算贝叶斯准则 (Bayes rule) $\delta_\pi^*$ 来估计参数 $\theta$ ．贝叶斯准则可以通过如下定理得到：

> ***定理*.** 如果决策准则 $\delta^* $ 满足
$$
r\left(\delta^* \mid x\right)=\inf _{a \in \mathcal{A}} r(a \mid x), \quad \forall x \in \mathcal{X},
$$
那么 $\delta^* $ 是一个贝叶斯准则。

#### 1.1.4 极小极大方法 (Minimax Procedure)
假设损失函数为 $l(\theta, a)$ ，我们通过计算极小极大准则 (minimax rule) $\delta^*$ 来估计参数 $\theta$ . 极小极大准则可以通过如下定理得到：

> ***定理*.**  如果存在先验分布 $\pi^* $ 使得其贝叶斯准则 $\delta_\pi^* $ 满足 $R(\theta,\delta_\pi^* )$ 对几乎处处 $\theta$ 是常数，那么 $\delta^* $ 是一个极小极大准则.

该定理的一个推广形式为：
> ***定理*.**  如果存在一列先验分布 $\{\pi_k\}$ 使得其贝叶斯准则 $\delta_k^* $ 满足 $r(\theta,\delta_k^* ) \to r=\sup_\theta R(\theta,\delta^* )$，那么 $\delta^* $ 是一个极小极大准则.

#### 1.1.5 一致最小方差无偏估计 (Uniformly Minimum Variance Unbiased Estimate, UMVUE)
我们评判一个估计如果是好的，我们希望这个估计是无偏的，并且方差能够尽量的小，因此我们希望能够找到方差最小的无偏估计，即**一致最小方差无偏估计**.

一致最小方差无偏估计的判定定理如下：
> ***定理*.** $W$ 是关于 $\tau(\theta)=E_\theta[W]$ 的UMVUE当且仅当 $W$ 与所有零无偏估计 (zero unbiased estimate) 不相关.

**(1)** 第一个计算UMVUE的方法：利用Cramer-Rao下界.

> ***定理*. (Cramer-Rao Lower Bound).**  令 $\psi(\theta)=E_\theta[T]$. 那么有如下不等式 
> 
> $$\operatorname{Var}_\theta(T) \geq \frac{|\psi'(\theta)|^2}{I(\theta)},$$
> 
>  其中 $I(\theta)=E_\theta\left[\left(\frac{\partial}{\partial\theta}\log L_X(\theta)\right)^2\right]$ 为信息数 (information number). 

如果不等式取到等号，那么 $T$ 即为 $\psi(\theta)$ 的UMVUE.

**(2)** 第二个计算UMVUE的方法：利用充分完备统计量.

> ***定理*.**  如果 $T$ 是关于 $\theta$ 的充分完备统计量，那么 $\phi(T)$ 是 $\tau(\theta)=E_\theta[\phi(T)]$ 的UMVUE.

我们有如下唯一性定理：

> ***定理*. (Lehmann-Scheffe).**  基于充分完备统计量的UMVUE是唯一的.

如果我们希望求得 $\tau(\theta)$ 的UMVUE，我们可以先找到 $\tau(\theta)$ 的一个无偏统计量 $W$. 令 $\phi(T)=E_\theta[W\mid T]$ ，那么由上述定理知 $\phi(T)$ 为 $\tau(\theta)$ 的UMVUE.

---

### 1.2 假设检验 (Hypothesis Testing)

#### 1.2.1 假设检验的一般方法
(1) 提出假设 $H_0\ v.s.\ H_1$；

(2) 确定检验统计量 (testing statistic) $T(x)$ 和拒绝域 (critical region / rejection region) $C$ 的形式，或者确定检验函数 (test function) $\varphi(x)$ 的形式；

(3) 选择合适的显著性水平 (level) $\alpha$ 并确定具体的拒绝域或者检验函数；

(4) 观测数据样本 $X$ ，计算检验统计量 $T(X)$ 或检验函数 $\varphi(X)$ ，并做出决定.
我们认为一个检验是好的，如果他能够很好地避免第二类错误，即在备选假设 $H_1$ 成立时拒绝零假设 $H_0$ 的概率更大，等价地，功效函数更大。因此我们希望能够找到一个**最优检验 (most powerful test, MP)**.

#### 1.2.2 简单假设的似然比检验 (Likelihood Ratio Test for Simple Hypothesis)
我们首先考虑简单假设的情形：$H_0: \theta=\theta_0,\ H_1: \theta=\theta_1$.

我们考虑如下的似然比检验 (likelihood ratio test function / Neyman-Pearson test function)：

$$
\varphi_k(x)= \begin{cases}1, & L\left(x, \theta_0, \theta_1\right)>k \\ 0, & L\left(x, \theta_0, \theta_1\right)<k\end{cases}
$$

当 $L\left(x, \theta_0, \theta_1\right)=k$ 时，$\varphi_k(x)$ 可以取任意值.
我们有如下定理：
> ***定理*. (Neyman-Pearson).** $\varphi_k(x)$ 定义如上。\
> (1) 如果 $\alpha>0$ 且 $\varphi_k$ 的显著性水平为 $\alpha$ ，那么 $\varphi_k$ 是显著性水平为 $\alpha$ 的最优检验；\
> (2) 对任意 $0 \leq \alpha \leq 1$ ，存在显著性水平为 $\alpha$ 的 $\varphi_k$ 为显著性水平为 $\alpha$ 的最优检验；\
> (3) 任何显著性水平为 $\alpha$ 的最优检验都是似然比检验。

#### 1.2.3 单调复合假设的似然比检验 (Likelihood Ratio Test for Monotone Composite Hypothesis)

我们考虑如下复合假设的似然比检验：$H_0: \theta \leq \theta_0, H_1: \theta>\theta_0$ .

如果此时分布族满足如下性质：对任意 $\theta_1<\theta_2$, $L\left(x, \theta_1, \theta_2\right)$ 关于 $T(x)$ 单调递增，那么称这个分布族相对于 $T(x)$ 具有**单调似然比 (monotone likelihood ratio，MLR)**.

如果一个分布族关于 $T(x)$ 具有单调似然比，定义如下检测函数（实质上就是似然比检验）：

$$
\delta_t(x)= \begin{cases}1, & T(x)>t \\ 0, & T(x)<t\end{cases}
$$

我们有如下定理：
> ***定理*. (Karlin-Rubin).** 假设分布族关于 $T(x)$ 具有单调似然比. 考虑假设 $H_0:\theta \leq \theta_0, H_1:\theta > \theta_0$ .\
> (1) 对任意 $t\in(0,+\infty)$ ，功效函数 $\beta(\theta)=E_\theta[\delta_t]$ 关于 $\theta$ 单调递增；\
> (2) 如果 $\beta(\theta_0)=\alpha>0$ ，那么 $\delta_t$ 是一个显著性水平为 $\alpha$ 的**一致最优检验 (uniformly most powerful, UMP)**.

#### 1.2.4 一般复合假设的似然比检验 (Likelihood Ratio Test for General Composite Hypothesis)
我们考虑一般的复合假设：$H_0:\theta\in\Theta_0,\ H_1:\theta\in\Theta_1$.

检验统计量为简单假设的似然比的推广： 

$$
\lambda(x)=\frac{\sup _{\theta \in \Theta} p(x \mid \theta)}{\sup _{\theta \in \Theta_0} p(x \mid \theta)}
$$

当似然比函数 $\lambda(x)>c$ 时，拒绝零假设 $H_0$. 该检验称为**似然比检验 (likelihood ratio test)**.

---

### 1.3 区间估计 (Interval Estimate)
#### 1.3.1 枢轴量法 (Pivot Quantity Method)
**枢轴量 (pivot)** 即分布与 $\theta$ 无关的统计量（可以包含 $\theta$ ）. 我们可以利用枢轴量来构造置信度为 $\alpha$ 的置信区间 (confidence interval)，方法如下：

(1) 构造枢轴量 $S(X)$；

(2) 选取区间 $[a, b]$ 使得 $P_\theta[a \leq S(X) \leq b]=1-\alpha$ ；

(3) 改写区间为 $[\underline{\theta}(X), \bar{\theta}(X)]$ .

对于正态分布 $\mathcal{N}\left(\mu, \sigma^2\right)$，有如下常见枢轴量： 

$$
\begin{aligned}
\frac{\sqrt{n}(\bar{X}-\mu)}{\sigma} & \sim \mathcal{N}(0,1) \\
\frac{(n-1) S^2}{\sigma^2} & \sim \chi_{n-1}^2 \\
\frac{\sqrt{n}(\bar{X}-\mu)}{S} & \sim t_{n-1}
\end{aligned}
$$

#### 1.3.2 基于假设检验和置信区间对偶性的方法
假设检验和置信区间之间有如下对偶性： 

$$\theta\in S(X)\Longleftrightarrow X\in A(\theta),$$

其中 $S(X)$ 是置信度为 $\alpha$ 的置信域， $A(\theta)$ 是显著性水平为 $\alpha$ 的检验的接受域。

根据如上对偶关系，我们有如下定理：

> ***定理.*** $\mathcal{P}$ 关于 $T(X)$ 具有单调似然比，且 $T(X)$ 的分布函数 $F_\theta(t)$ 关于 $t$ 和 $\theta$ 都是连续的.\
> (1) 方程 $F_\theta(t)=1-\alpha$ 的解为 $\underline\theta_{\alpha}(t)$ ，那么 $\underline\theta_\alpha(T)$ 是置信度为 $1-\alpha$ 的置信下界；\
> (2) 方程 $F_\theta(t)=\alpha$ 的解为 $\overline\theta_\alpha(t)$ ，那么 $\overline\theta_\alpha(T)$ 是置信度为 $\alpha$ 的置信上界；\
> (3) 如果 $\alpha_1+\alpha_2<1$ ，那么 $[\underline\theta_{\alpha_1}(T), \overline\theta_{\alpha_2}(T)]$ 是置信度为 $1-\alpha_1-\alpha_2$ 的置信区间.

#### 1.3.3 一致最精确置信下/上界 (Uniformly Most Accurate LCB/UCB, UMA)
我们认为一个置信下界 $\underline{\theta}^*$ 与 $\underline{\theta}$ 相比是**更精确的 (more accurate)**，如果该下界距离 $\theta$ 较远的概率比较小，即对于任意固定的 $\theta$ ，对任意 $\theta'<\theta$ ，有 

$$P_\theta[\underline{\theta}^*(X)<\theta']\leq P_\theta[\underline{\theta}(X)<\theta'].$$

我们希望能够找到一个最精确的置信下界，即**一致最精确置信下界 (uniformly most accurate, UMA)**. 根据假设检验和置信区间之间的对偶性，我们有如下定理：
> ***定理.*** $\underline{\theta}^* $ 是一个置信度为 $1-\alpha$ 的置信下界，使得对任意 $\theta_0$ ，对于假设 $H_0: \theta = \theta_0,\ H_1: \theta > \theta_0$ 的检验函数 
>
> $$\delta_{\theta_0}=\begin{cases}1,&\underline{\theta}^*(X)>\theta_0\\0,&\underline{\theta}^* (X)<\theta_0\end{cases}$$ 
>
> 是显著性水平为 $\alpha$ 的一致最优检验，那么 $\underline{\theta}^*$ 是置信度为 $1-\alpha$ 的一致最精确下界.


## 2. 渐进方法 (Asymptotic Methods)

接下来我们考虑渐进方法。有时候一些统计量的分布非常复杂并且难以计算，因此在样本量足够大的时候我们可以利用其渐进表现来对参数进行估计。

### 2.1 Delta Method
Delta method是一种用来计算随机变量渐进分布的方法，在样本量较大的时候，我们可以利用delta method计算特定统计量的渐进分布，并做出渐进估计或构造近似置信区间。

对于参数空间为一维的情形 $\Theta \subset \mathbb{R}$，我们有一阶和二阶两种方法：

> ***引理.* (First order method).** $\{U_n\}$ 为一列随机变量，$a_n \rightarrow+\infty, n \rightarrow \infty$. 如果\
> (1) 存在常数 $u$ 及随机变量 $V$ 使得 $a_n\left(U_n-u\right) \xrightarrow{L} V$，\
> (2) 函数 $g$ 在 $u$ 处可微，那么  
>
> $$a_n\left(g\left(U_n\right)-g(u)\right) \xrightarrow{L} g'(u) V .$$

> ***引理.* (Second order method).**  如果 $\sqrt{n}\left(X_n-\theta\right) \xrightarrow{L} \mathcal{N}\left(0, \sigma^2\right)$，函数 $g$ 二阶可微，$g^{\prime}(\theta)=0, g^{\prime \prime}(\theta) \neq 0$ ，那么 
> 
> $$n\left(g\left(X_n\right)-g(\theta)\right) \xrightarrow{L} \frac{g^{\prime \prime}(\theta)}{2} \sigma^2 \chi_1^2 .$$

对于参数空间为高维的情形 $\Theta \subset \mathbb{R}^d$，我们有如下引理：
> ***引理.* (First order method).**  $\{\boldsymbol{U}_n\}$ 为一列维数为 $d$ 的随机向量，$a_n \rightarrow+\infty, n \rightarrow \infty$. 如果
> (1) 存在常数向量 $\boldsymbol{u}$ 及随机向量 $\boldsymbol{V}$ 使得 $a_n\left(\boldsymbol{U}_n-\boldsymbol{u}\right) \xrightarrow{L} \boldsymbol{V}$ ，\
> (2) 函数 $g: \mathbb{R}^d \rightarrow \mathbb{R}^p$ 在 $\boldsymbol{u}$ 处可微，那么 
>
> $$a_n\left(g\left(\boldsymbol{U}_n\right)-g(\boldsymbol{u})\right) \xrightarrow{L} g^{(1)}(\boldsymbol{u}) \boldsymbol{V} .$$

我们将在后面的渐进估计方法中看到delta method的应用.

---

### 2.2 渐进点估计 (Asymptotic Point Estimate)
我们主要考虑参数空间为一维的情形 $\Theta\subseteq \mathbb{R}$ .

#### 2.2.1 极小差异估计的渐进表现
考虑差异函数 $\rho(X, \theta)$ . 我们需要如下正则性假设：
- A0：$\psi=\frac{\partial \rho}{\partial \theta}$ 是良定义的， $\bar\theta_n$ 是 $\frac{1}{n} \sum_{i=1}^n \psi\left(X_i, \theta\right)=0$ 的解；
- A1：对于任意分布 $P$ ，定义 $\theta(P)$ 为方程 $E_P[\psi(X, \theta)]=0$ 的唯一解．特别地，我们有 $\theta\left(P_\theta\right)=\theta$ ；
- A2：$E_P\left[\psi^2(X, \theta(P))\right]<\infty, \forall P$ ；
- A3：$\psi$ 可微，且 $\partial_\theta \psi$ 的期望有限且非零；
- A4：$\lim_{\epsilon_n \rightarrow 0} \sup_{\vert t-\theta(P)\vert \leq \epsilon_n}\left\vert\frac{1}{n} \sum_{i=1}^n \frac{\partial \psi}{\partial \theta}\left(X_i, t\right)-\frac{1}{n} \sum_{i=1}^n \frac{\partial \psi}{\partial \theta}\left(X_i, \theta(P)\right)\right\vert \xrightarrow{P} 0$ ； 
- A5： $\bar{\theta}_n \xrightarrow{P} \theta(P)$ ．

在上述A0-A5假设成立的情况下，极小对比估计有如下的渐进正态性 (asymptotic nomality)：

> ***定理.*** 在A0-A5成立的情况下，我们有
> 
> $$\sqrt{n}\left(\bar{\theta}_n-\theta(P)\right) \xrightarrow{L} \mathcal{N}\left(0, \sigma^2(\psi, P)\right),$$
> 
> 其中
> 
> $$\sigma^2(\psi, P)=\frac{E_P\left[\psi^2(X, \theta(P))\right]}{\left(E_P\left[\frac{\partial \psi}{\partial \theta}(X, \theta(P))\right]\right)^2} .$$

#### 2.2.2 极大似然估计的渐进表现
考虑特殊的差异函数 $\rho(X, \theta)=-l_X(\theta)$， $\hat{\theta}_n$ 为极大似然估计. 在A0-A5的基础上，我们还需要一条假设：

- A6：分布族 $\mathcal{P}=\\{P_\theta: \theta \in \Theta\\}$ 是正则的 (regular)，$l(x, \theta):=l_x(\theta)$ 关于 $x, \theta$ 可微，且满足

$$
E_\theta\left[\frac{\partial \psi}{\partial \theta}\left(X_1, \theta\right)\right]=-E_\theta\left[\frac{\partial l}{\partial \theta}\left(X_1, \theta\right) \cdot \psi\left(X_1 \theta\right)\right] .
$$

A6假设的主要作用是保证 $\frac{\partial}{\partial \theta}$ 和 $\int_{\mathcal{X}}$ 可以交换．
在上述 A0-A6 假设成立的情况下，极大似然估计有如下的渐进正态性：

> ***定理.*** 在A0-A6成立的情况下，我们有
> 
> $$\sqrt{n}\left(\hat{\theta}_n-\theta\right) \xrightarrow{L} \mathcal{N}\left(0, I_1(\theta)^{-1}\right) .$$
> 
> 此外，对于任意满足 A0-A5 的极小差异估计，我们有如下不等式：
> 
> $$\sigma^2\left(\psi, P_\theta\right) \geq I_1(\theta)^{-1} .$$

---

### 2.3 渐进区间估计 (Asymptotic Interval Estimate)
当枢轴量的分布非常复杂并难以计算时，我们可以利用中心极限定理得到渐进分布. 如果渐进分布与参数 $\theta$ 无关，那么我们可以依此构造**近似置信区间 (approximate confidence interval)**. 这里我们有如下两种方式.

#### 2.3.1 Slutsky's Theorem
假设通过中心极限获得如下渐进分布：

$$
\sqrt{n}\left(\bar{X}_n-\theta\right) \xrightarrow{L} \mathcal{N}\left(0, \sigma^2(\theta)\right),
$$

由Continuous Mapping Theorem，我们有

$$
\sigma^2\left(\bar{X}_n\right) \xrightarrow{P} \sigma^2(\theta) .
$$

由 Slutsky 定理，结合上面两个渐进分布，我们可以得到

$$
\frac{\sqrt{n}\left(\bar{X}_n-\theta\right)}{\sigma\left(\bar{X}_n\right)} \xrightarrow{L} \mathcal{N}(0,1) .
$$

#### 2.3.2 方差平稳变换 (Variance Stabilizing Transformation，VST)

假设通过中心极限获得如下渐进分布：

$$
\sqrt{n}\left(\bar{X}_n-\theta\right) \xrightarrow{L} \mathcal{N}\left(0, \sigma^2(\theta)\right),
$$

构造函数 $g(x)$ 满足 $\left[g^{\prime}(\theta)\right]^2 \sigma^2(\theta)=1, \forall \theta$ ．由 delta method，我们可以得到

$$
\sqrt{n}\left(g\left(\bar{X}_n\right)-g(\theta)\right) \xrightarrow{L} \mathcal{N}(0,1) .
$$

---

### 2.4 渐进假设检验 (Asymptotic Hypothesis Testing)
我们考虑参数空间为 $p$ 维的情形。考虑假设 $H_0: \theta=\theta_0,\ H_1:\theta\neq\theta_0$ .

#### 2.4.1 似然比检验 (Likelihood Ratio Test)
我们延用之前的似然比检验统计量的定义：

$$
\lambda(x)=\frac{\sup _{\theta \in \Theta} p(x \mid \theta)}{\sup _{\theta \in \Theta_0} p(x \mid \theta)}=\frac{L_X\left(\hat{\theta}_n\right)}{L_X\left(\theta_0\right)},
$$

其中 $\hat{\theta}_n$ 为极大似然估计.

在实际问题中，似然比检验统计量可能并没有良好的分布表现，因此我们希望考虑其渐进行为．似然比检验统计量有如下渐进行为：

> ***定理.*** 我们有如下渐进分布
> 
> $$2 \log \lambda(x)=2\left(\log \lambda\left(\hat{\theta}_n\right)-\log \lambda\left(\theta_0\right)\right) \xrightarrow{L} \chi_p^2$$

当 $2 \log \lambda(X) \geq x_p^2(1-\alpha)$ 时，拒绝零假设 $H_0$ ，那么该假设检验具有渐进显著性水平 $\alpha$.

#### 2.4.2 Wald 检验 (Wald Test)
> ***定理.*** 我们有如下渐进分布
> 
> $$W_n\left(\theta_0\right):=n\left(\hat{\theta}_n-\theta_0\right)^{\top} I_1\left(\theta_0\right)\left(\hat{\theta}_n-\theta_0\right) \xrightarrow{L} \chi_p^2 .$$
> 
> 其中 $I_1\left(\theta_0\right)$ 可以替换为其他依概率收玫到 $I_1\left(\theta_0\right)$ 的统计量．

当 $W_n\left(\theta_0\right) \geq x_p^2(1-\alpha)$ 时，拒绝零假设 $H_0$ ，那么该假设检验具有渐进显著性水平 $\alpha$ .

#### 2.4.3 Rao得分检验 (Rao Score Test)
令 $\psi_n(\theta)=\frac{1}{n} \sum_{i=1}^n \nabla_\theta l_{X_i}(\theta)$ .

> ***定理.*** 我们有如下渐进分布
> 
> $$R_n\left(\theta_0\right):=n \psi_n\left(\theta_0\right)^{\top} I_1\left(\theta_0\right)^{-1} \psi_n\left(\theta_0\right) \xrightarrow{L} \chi_p^2 .$$


当 $R_n\left(\theta_0\right) \geq x_p^2(1-\alpha)$ 时，拒绝零假设 $H_0$ ，那么该假设检验具有渐进显著性水平 $\alpha$.

如何直观理解以上三种渐进假设检验呢？我们可以参考下面这张图片：
<!-- ![这是图片描述](/assets/img/asymptotic%20hypothesis%20test.png) -->

{% include figure.liquid
    path="/assets/img/asymptotic%20hypothesis%20test.png"
    caption="（图片来源于yf老师上课板书）"
    alt="Asymptotic Hypothesis Test"
    width="80%"
    class="img-fluid" %}

如上图所示，似然比检验、Wald检验、Rao得分检验分别从纵坐标、横坐标、斜率三个方面对参数进行估计.

---

以上是对本学期课程总结的总结，完结撒花～