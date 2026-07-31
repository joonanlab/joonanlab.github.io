---
title: "치료 내성 이후의 종양은 어떤 면역 상태인가"
date: "2026-07-31"
summary: "면역항암제, 표적치료, 내분비치료, PARP 억제제의 내성 상태를 면역 가시성, 면역 접근, 이펙터 기능이라는 3가지 차원으로 함께 읽자는 리뷰를 정리한다."
tags: ["cancer", "immune-evasion", "therapy-resistance", "tumor-microenvironment", "immunotherapy", "review", "public-research"]
lang: "ko"
category: "Essay"
---

논문 원문: [Journal of Experimental & Clinical Cancer Research](https://doi.org/10.1186/s13046-026-03798-0)

표적치료에 잘 반응하던 환자가 몇 달 뒤 진행하고, 그다음 순서로 넣은 면역항암제가 기대만큼 듣지 않는 일을 임상에서 자주 봅니다. 그 시점의 종양이 치료 전과 같은 면역 상태인지, 그사이에 면역계가 종양을 보고 접근하고 죽이는 조건 자체가 달라진 것인지가 이번 리뷰의 질문입니다. 면역항암제, 표적치료, 내분비치료, PARP 억제제의 내성을 한자리에 놓고 이 세가지 조건 가운데 무엇이 무너졌는지로 읽어보자는 제안을 담았습니다.

## 우리가 이 질문에 관심을 갖게 된 경로

위암 코호트에서 m6A reader 단백질 YTHDF가 IRF1 mRNA의 안정성을 낮춰 IFN-gamma 신호를 약화시킨다는 기전을 확인했을 때, 종양세포의 분자 상태가 면역 신호의 세기를 직접 정한다는 것을 데이터로 본 셈이었습니다. 전장 유전체 배수화 리뷰에서는 같은 유전체 사건이 종양 진화를 밀어주기도 하고 억제 신호를 만들기도 하는 맥락 의존성을 정리했습니다. IGF2BP 팬암 프로테오지놈 분석에서는 발생 장기가 달라도 비슷한 단백질 신호를 공유하는 아형이 존재한다는 결과를 얻었습니다. 세가지 연구 모두에서 종양의 분자 상태와 그 종양을 둘러싼 면역 조건을 따로 읽으면 설명이 막혔습니다. 이 문제는 치료가 한 번 실패한 뒤에 가장 분명해집니다. 표적치료로 선택된 내성 클론은 약에서 벗어나는 동시에 항원제시, 염증 신호, 기질 구조, myeloid 조성까지 함께 바꿔놓습니다. 다음 치료를 고를 때 봐야 할 것은 어떤 변이가 새로 생겼는지에 더해, 지금 이 종양이 면역계에 어떤 상태로 놓여 있는지입니다. 그래서 이 리뷰에서는 immune checkpoint 내성에서 밝혀진 기전들을 먼저 정리한 다음, osimertinib 내성, AR 경로 내성, BRCA reversion에서도 같은 변화가 일어나는지 하나씩 확인했습니다.

## 내성을 3가지 차원으로 읽습니다

Antitumor immunity가 작동하려면 세가지 조건이 충족돼야 합니다. 종양이 면역계에 보여야 하고(가시성), 면역세포가 종양 둥지까지 물리적으로 닿아야 하고(접근), 도달한 effector cell이 기능을 유지해야 합니다(이펙터 기능). 이 세가지 차원은 Chen & Mellman (2013, 2017)이 정리한 cancer-immunity cycle과 tumor immune phenotype을 실무적으로 재배열한 것이고, 면역관문억제제 내성 연구가 이미 가장 잘 정리해둔 영역이기도 합니다. 가시성 차원의 고전적 사례는 항원제시와 interferon 신호의 손실입니다. JAK1/2의 loss-of-function 변이는 종양세포를 IFN-gamma에 둔감하게 만들고 PD-L1의 적응적 상승을 막아 PD-1 차단제의 획득 내성과 일차 내성 모두에 기여합니다. B2M의 loss-of-function은 세포 표면 MHC-I을 없애 CD8 T세포의 인식 자체를 무력화합니다. Allele-specific HLA loss of heterozygosity는 비소세포폐암의 약 40퍼센트에서 관찰되고, 면역 선택압 아래에서 subclone 수준으로 생기며, subclonal neoantigen 부담이 높은 종양에서 자주 나타납니다. KRAS G12D를 표적하는 HLA-C\*08:02 제한 T세포로 치료받은 환자에서 진행한 병변 하나가 HLA-C\*08:02를 담은 6번 염색체 하플로타입을 잃은 사례는, 표적 변이가 남아 있어도 제시 allele이 사라지면 치료가 무력해진다는 것을 한 환자 안에서 보여줍니다.

TGF-beta가 이끄는 섬유화, 비정상 extracellular matrix 침착, cancer-associated fibroblast의 immune exclusion은 면역세포가 존재해도 무력한 공간 구조를 만듭니다. Urothelial carcinoma에서는 fibroblast의 TGF-beta 신호가 콜라겐을 쌓아 T세포를 종양 주변 기질에 가둬 종양세포와의 직접 접촉을 막습니다. 혈관 구조는 그 자체로 별개의 장벽인데, 치료로 다시 열 수 있다는 것도 확인됐습니다. 생쥐 유방암과 췌장 신경내분비종양 모델에서 VEGFR2와 PD-L1을 함께 차단하자 종양 안에 HEV(high endothelial venule) 유사 신생혈관이 생겼고 그 주변에서 종양내 T세포와 B세포가 3배에서 10배까지 늘었습니다. 이펙터 기능 차원에서는 MDSC, regulatory T cell, M2로 기운 macrophage가 반복해서 등장하는데, 이들은 어떤 약이 그 내성 상태를 처음 선택했는지와 무관하게 cytotoxic T cell을 무디게 만듭니다. Regulatory T cell은 IL-2를 경쟁적으로 소모하고 TGF-beta와 IL-10을 분비하며, MDSC는 arginine과 cysteine을 고갈시키고 reactive oxygen species를 만들어 대사와 신호 양쪽에서 적대적인 환경을 만듭니다. TLS(tertiary lymphoid structure)가 없으면 국소 면역 priming의 원천 자체가 사라지고, lactate 축적은 미세환경을 산성화해 T세포 증식을 직접 저해합니다. GDF-15, 종양 유래 PD-L1 보유 extracellular vesicle, 장내 미생물 불균형처럼 종양 경계를 넘어선 신호까지 더해지면 이펙터 실패는 숙주 수준의 문제가 됩니다. 여기까지는 면역항암제 내성 연구가 이미 밝혀둔 기전이고, 리뷰가 새로 물은 것은 표적치료, 내분비치료, PARP 억제제로 선택된 내성 상태에서도 같은 기전이 나타나는지입니다.

## 표적치료 내성이 가장 완결된 사례입니다

세가지 사례 가운데 근거가 가장 두꺼운 쪽은 표적치료 내성입니다. EGFR tyrosine kinase inhibitor 내성은 교과서적으로 C797S 같은 on-target 변이로 설명되는데, 797번 cysteine이 바뀌면 osimertinib이 공유결합할 닻을 잃습니다. 그런데 내성 상태는 약리학적 탈출에서 끝나지 않습니다. EMT(epithelial-mesenchymal transition)는 EGFR TKI 내성에서 반복 관찰되는 특징이고, 폐선암에서 EMT 전사 프로그램은 PD-L1 상승, 여러 억제성 면역관문, 염증성이면서 면역억제적인 미세환경과 함께 나타납니다. 기능적으로도 EMT 조절자 ZEB1이 miR-200을 억제해 PD-L1을 올리고 CD8 T세포의 이펙터 기능을 떨어뜨립니다. KRAS G12C 억제제 쪽에서는 sotorasib 투여 전후 조직을 다부위로 비교한 단일 환자 연구에서 KRAS 경로 재활성화, EMT, 대사 재프로그래밍과 함께 면역 유전자 signature가 줄어드는 생태계 수준의 변화가 관찰됐습니다. STK11이나 KEAP1 변이가 같이 있으면 차갑고 억제적인 상태가 더 굳어지는데, KRAS 변이 비소세포폐암에서 STK11 변이는 PD-1 차단 일차 내성과 강하게 연관됩니다. 탐색적 분석에서는 STK11, KEAP1 변이 종양에 PD-(L)1 차단과 chemotherapy에 CTLA-4 차단을 더했을 때 전체생존 중앙값이 15.8개월 대 7.3개월(위험비 0.64, 95퍼센트 신뢰구간 0.40에서 1.04)로 보고됐지만, 하위군이 작고 통계적 유의성에 이르지 못했으며 야생형 종양보다 여전히 나쁩니다. 임상 근거도 같은 방향을 가리키는데, EGFR TKI 내성 이후 nivolumab과 ipilimumab 병용을 시험한 무작위 2상은 전체 객관적 반응률 3.2퍼센트로 futility로 조기 종료됐고, 차갑고 억제적인 미세환경이 이미 자리를 잡은 뒤에는 관문 강화만으로 뚫기 어렵다는 것을 보여줍니다.

## AR 경로와 BRCA reversion은 근거의 두께가 다릅니다

유전체 전체 CRISPR interference 스크린에서 androgen receptor가 MHC-I 항원제시 유전자의 직접 transcriptional repressor로 확인됐고, enzalutamide로 AR을 억제하자 전임상 모델에서 CD8 T세포 인식이 향상됐으며 짝지은 환자 조직에서 표면 MHC-I 발현 증가가 동반됐습니다. 그런데 이 면역학적 이득은 거세저항성이 진행하면서 사라졌고, 그 시점에 glucocorticoid receptor가 올라가 MHC-I을 다시 억제했습니다. Enzalutamide 내성 전립선암 세포는 PD-L1을 올리고 chemotaxis와 IFN 반응 경로를 억제하며 MDSC 분화를 촉진하고 macrophage를 M2로 기울입니다. 거세저항성 전립선암에서는 granulocytic MDSC가 우세한 myeloid 아집단이고 생존과 역상관을 보입니다. 종양 침윤 myeloid 세포가 분비하는 IL-23은 androgen이 결핍된 조건에서 종양세포의 AR 신호를 직접 활성화해 myeloid 염증과 거세저항성 사이에 되먹임 고리를 만듭니다. 이 의존성은 치료로 건드릴 수 있는데, CXCR2 억제와 enzalutamide 병용은 종양내 myeloid 침윤을 줄이고 전이성 거세저항성 환자 일부에서 지속 반응을 만들었습니다. 다만 AR-V7 자체가 면역학적으로 차가운 미세환경을 만든다는 직접 근거는 아직 제한적이어서, lineage 신호와 면역 재편의 연결은 그럴듯하지만 임상 근거는 표적치료 쪽보다 얇습니다. ASCL1이 이끄는 신경내분비 전환에서 MHC-I 항원제시가 줄어 CD8 T세포에 잘 보이지 않게 된다는 관찰은 가시성 차원과 이펙터 기능 차원이 동시에 무너지는 사례입니다.

BRCA1/2 reversion 변이는 homologous recombination(HR) 기능을 복구해 종양을 치료에 취약하게 만들었던 결함 자체를 되돌립니다. BRCA 결핍 종양에서는 replication stress와 PARP 억제가 세포질 DNA 조각을 만들어 cGAS-STING을 활성화하고 type I interferon과 CXCL10, CCL5 같은 chemokine을 유도해 CD8 T세포를 불러들입니다. Reversion으로 HR이 복구되면 이 innate immune 가시성이 약해질 것으로 예상되는데, 같은 reversion 과정이 새로운 junctional neopeptide를 만들 수 있다는 점이 문제를 이중적으로 만듭니다. 다만 그 neopeptide는 계산으로 예측됐을 뿐 면역원성이 실험으로 검증되지는 않았고, 이 지점은 리뷰에서 가장 조심스럽게 서술한 부분입니다. 간접적인 임상 신호로는 BRCA 야생형 platinum-resistant 난소암에서 niraparib과 dostarlimab을 병용한 2상 MOONSTONE/GOG-3032가 객관적 반응률 7.3퍼센트로 futility로 조기 종료된 결과가 있는데, 이 종양들은 처음부터 HR이 온전해 cGAS-STING priming이 없었으므로 reversion 이후 상태로 곧장 확대해석하기 어렵습니다. PARP 억제제 내성이 reversion 하나로 이뤄지지 않는다는 점도 중요합니다. 53BP1이나 shieldin 소실은 end resection 경로로 HR을 복구하므로 새 junction 서열을 만들지 않고, replication fork protection은 HR 요구 자체를 우회하며, PARP1 변이나 ABCB1 매개 drug efflux는 종양과 면역계의 접점을 거의 건드리지 않을 것으로 보입니다. 그래서 PARP 억제제 내성은 하나의 immune evasion 차원에 균일하게 대응되지 않고, 경로마다 면역학적 귀결이 갈립니다.

## 이 틀이 임상에서 무엇을 바꾸는가

약을 계열로 고르는 대신 지금 이 내성 상태에서 가장 크게 망가진 차원을 먼저 판정하자는 것이 이 관점이 임상에 요구하는 첫 단계입니다. 이펙터 기능이 주로 무너진 종양이라면 관문 조합이나 myeloid 표적 전략이 후보가 되고, 가시성을 잃은 종양이라면 항원을 되살리거나 neoantigen을 겨냥하는 접근이 더 맞습니다. 조합 요법의 근거는 계열마다 성숙도가 다른데, relatlimab과 nivolumab의 PD-1/LAG-3 이중 차단은 진행성 흑색종에서 nivolumab 단독보다 무진행생존을 개선했고(RELATIVITY-047), TIGIT 표적 조합은 비소세포폐암 초기 신호는 고무적이었으나 3상 검증은 엇갈렸습니다. 시점도 중요해 보이는데, lenvatinib과 pembrolizumab의 신장세포암 1차 치료 병용은 임상 활성을 보였지만 그 시험은 시점이나 순서를 검증하도록 설계되지 않았습니다. 접근 차원 복구를 노린 TGF-beta 차단은 성적이 고르지 않아서, TGF-beta 중화와 PD-L1 차단을 한 분자에 담은 bintrafusp alfa는 PD-L1 고발현 비소세포폐암에서 pembrolizumab보다 우월하지 않았고 담도암 2/3상도 1차 종점을 놓쳤으나 platinum 치료 실패 후 재발 자궁경부암에서는 활성 신호가 나왔습니다. Myeloid 재프로그래밍도 세기 조절이 필요한데, CSF1R을 더 강하게 차단하면 오히려 억제성 macrophage 상태가 늘어 역효과가 날 수 있다는 중개연구 결과가 있습니다. 가시성 복구 쪽에서는 DNMT 억제가 MHC-I 유전자, cancer-testis antigen, endogenous retrovirus 요소의 발현을 되살려 viral mimicry 신호와 type I interferon을 유도하고, dMMR 대장암에서 반복되는 MSI 연관 변이를 겨냥한 frameshift 펩타이드 백신이 면역원성을 보였으며, MAGE-A4를 표적한 친화도 강화 TCR 치료가 활막육종에서 의미 있는 활성을 보였습니다(SPEARHEAD-1). 세포 제조 없이 세포내 변이를 겨냥하는 경로도 열려서, TP53 R175H peptide-HLA 복합체를 인식하는 이중특이항체는 항원 밀도가 낮아도 T세포를 활성화하고 종양세포를 용해시켰습니다.

## 남은 문제

종양내 이질성 때문에 같은 병변 안의 서로 다른 subclone이 동시에 다른 immune evasion 차원을 점유할 수 있고, 그런 모자이크 상태는 벌크 전사체나 유전체 프로파일링으로 잘 잡히지 않습니다. 공간 구조도 문제인데, 전체 미세환경이 허용적으로 보여도 T세포 침윤은 특정 niche에만 갇혀 있을 수 있고 억제성 세포들은 기질 조직이나 혈관 접근성으로 정의되는 구역에 뭉치는 경향이 있습니다. 시간에 따른 변화는 더 어렵습니다. 내성이 진화하는 동안과 그 뒤로 몇 주에서 몇 달에 걸쳐 면역세포 조성, 관문 발현, 항원제시가 순차적으로 바뀌는데 단일 시점 생검으로는 이 변화를 해상할 수 없습니다. 그래서 이 틀을 실제로 쓰려면 종단, 공간, 가능하면 단일세포 수준의 면역 프로파일링이 필요합니다. 다음 단계는 전향적 검증입니다. 치료 전과 내성 시점의 짝지은 생검, 종단 ctDNA 프로파일링, 공간 해상 면역 모니터링을 갖춰야 내성 종양을 가시성, 접근, 이펙터 기능 가운데 어느 결핍이 지배적인지로 재현성 있게 분류할 수 있는지 판정할 수 있습니다. 당장 할 수 있는 일은 짝지은 생검과 면역 상관 데이터를 이미 가진 코호트에 이 분류를 후향적으로 적용해보는 것입니다. 이 리뷰가 서술적 종합이라 비소세포폐암, 유방암, 전립선암 패러다임에 기울어 있다는 점, 그래서 교모세포종이나 췌장선암처럼 면역생물학이 다른 종양에는 그대로 확장되지 않을 수 있다는 점도 본문에 적어뒀습니다.

이 주제는 정하은, 최희선 학생이 정말 열심히 붙들고 있는 영역이고, 두 사람이 저보다 훨씬 많이 읽고 정리해왔습니다. 초안을 함께 고치면서 오히려 학생들을 통해 제가 공부를 더 한 것 같습니다. 암과 면역 쪽에 깊은 통찰을 가진 아주대 의대 임수빈 교수님이 개념을 세우는 단계부터 많이 도와주셨고, 싱가포르 국립암센터 종양내과의 Wan-Teck Lim 교수님이 임상과 중개연구 관점에서 많은 도움을 주셨습니다.
