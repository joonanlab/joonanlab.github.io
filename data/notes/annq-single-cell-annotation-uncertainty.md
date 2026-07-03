---
title: "Annotation uncertainty를 생물학적 신호로 읽기"
date: "2026-05-31"
summary: "AnnQ가 reference-based single-cell annotation에서 버려지던 uncertainty를 cellular abnormality의 readout으로 바꾸는 이유를 소개합니다."
tags: ["AnnQ", "single-cell", "annotation", "perturbation", "virtual-cell"]
lang: "ko"
category: "Genomics + AI"
---

논문 원문: [Briefings in Bioinformatics](https://academic.oup.com/bib/article/27/3/bbag278/8698826)

단일세포 전사체 분석(single-cell RNA sequencing)은 이제 생물학 연구에서 표준 도구로 자리 잡았습니다. 세포 하나하나의 유전자 발현량을 측정하고 그 값을 근거로 각 세포가 어떤 세포 유형에 가까운지 예측합니다. 특히 유전자 조작 동물과 야생형, 약물 처리군과 대조군, 환자 조직과 정상 조직을 비교할 때, 각 세포의 정체성과 상태가 어떻게 달라지는지를 보는 데 널리 사용됩니다.

그런데 실제 공동연구를 하다 보면 반복적으로 마주치는 문제가 있었습니다. 많은 실험은 기존 reference에 이미 잘 정의된 세포 유형을 다시 확인하기 위해 설계되지 않습니다. 오히려 특정 유전자를 knockout하거나 약물을 처리하거나 질환 상태를 만들었을 때 기존에 관찰되지 않았던 변화가 생기는지를 보기 위해 수행됩니다. 그렇다면 가장 흥미로운 세포들은 reference와 잘 맞지 않는 세포일 가능성이 큽니다. 하지만 기존 annotation pipeline에서는 이런 애매함이 종종 noise나 low-confidence label로 처리됩니다.

AnnQ는 reference와 잘 맞지 않는 이 애매한 순간을 포착하려는 도구입니다. reference-based annotation에서 나오는 확률 분포를 단순히 cell type label을 고르는 데만 쓰지 않고 세포 정체성이 얼마나 안정적인지, reference 밖으로 얼마나 벗어나는지를 정량화합니다. 그래서 세포를 G0, G1, G2, G3와 같은 uncertainty state로 나누고 out-of-reference score를 함께 계산합니다. 새로운 cluster가 뚜렷하게 생기지 않아도 lineage 수준의 subtle shift를 읽을 수 있습니다.

예를 들어 Fezf2 perturbation처럼 새로운 cluster가 명확히 분리되지 않는 경우에도, 특정 neuronal lineage에서 G1이 증가하고 OOR tail이 길어진다면 "이 세포들의 정체성이 흔들리고 있다"고 해석할 수 있습니다. 암 데이터에서는 정상 reference에 억지로 annotation되는 malignant cell 안에서도 G1과 OOR 변화를 읽어 drug-tolerant persister 상태, EMT-like transition, metastatic precursor 상태를 추적할 수 있습니다.

이번 AnnQ 논문은 짧은 방법론 논문입니다. 앞으로 다양한 실험 데이터와 환자 데이터에 적용할 수 있는 여지가 많고 저도 이 방식에서 파생되는 여러 생각들을 계속 발전시키고 있습니다. 이 연구는 이다빈, 변가은 학생이 주도하여 완성했습니다. 다소 이상하게 출발한 PI의 아이디어를 믿고 구현까지 함께해 준 두 학생에게 고맙습니다. 앞으로 가상세포와 perturbation biology를 잇는 더 흥미로운 연구들을 이어가 보려 합니다.
