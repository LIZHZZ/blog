---
title: 浮点数二进制转换器
date: 2024-12-19
type: "tools"
layout: "page"
comments: false
---

<div class="converter-page">

# 🔢 浮点数二进制转换器

<div class="intro">
  <p>可视化展示 Float 和 Double 类型在内存中的二进制表示</p>
  <p>基于 IEEE 754 标准</p>
</div>

## Float (32位单精度)

<div class="converter-section">
  <div class="input-group">
    <label>输入浮点数：</label>
    <input type="number" id="float-input" placeholder="例如: 3.14" step="any">
    <button onclick="convertFloat()" class="convert-btn">转换</button>
  </div>

  <div id="float-result" class="result-container"></div>
</div>

## Double (64位双精度)

<div class="converter-section">
  <div class="input-group">
    <label>输入浮点数：</label>
    <input type="number" id="double-input" placeholder="例如: 3.14159265359" step="any">
    <button onclick="convertDouble()" class="convert-btn">转换</button>
  </div>

  <div id="double-result" class="result-container"></div>
</div>

## 📚 IEEE 754 标准说明

<div class="info-section">

### Float (32位) 结构
<div class="structure-box">
  <div class="structure-item">
    <span class="bit-label sign">符号位 (1位)</span>
    <p>0 = 正数，1 = 负数</p>
  </div>
  <div class="structure-item">
    <span class="bit-label exponent">指数位 (8位)</span>
    <p>偏移量 127，范围 -126 到 127</p>
  </div>
  <div class="structure-item">
    <span class="bit-label mantissa">尾数位 (23位)</span>
    <p>小数部分，隐含前导 1</p>
  </div>
</div>

### Double (64位) 结构
<div class="structure-box">
  <div class="structure-item">
    <span class="bit-label sign">符号位 (1位)</span>
    <p>0 = 正数，1 = 负数</p>
  </div>
  <div class="structure-item">
    <span class="bit-label exponent">指数位 (11位)</span>
    <p>偏移量 1023，范围 -1022 到 1023</p>
  </div>
  <div class="structure-item">
    <span class="bit-label mantissa">尾数位 (52位)</span>
    <p>小数部分，隐含前导 1</p>
  </div>
</div>

</div>

## 🧪 常用测试值

<div class="test-values">
  <button onclick="testFloat(0)" class="test-btn">0</button>
  <button onclick="testFloat(1)" class="test-btn">1</button>
  <button onclick="testFloat(-1)" class="test-btn">-1</button>
  <button onclick="testFloat(3.14)" class="test-btn">3.14</button>
  <button onclick="testFloat(0.1)" class="test-btn">0.1</button>
  <button onclick="testFloat(Infinity)" class="test-btn">∞</button>
  <button onclick="testFloat(-Infinity)" class="test-btn">-∞</button>
  <button onclick="testFloat(NaN)" class="test-btn">NaN</button>
</div>

</div>

<script>
function floatToBinary32(num) {
  const buffer = new ArrayBuffer(4);
  const floatView = new Float32Array(buffer);
  const intView = new Uint32Array(buffer);
  
  floatView[0] = num;
  const bits = intView[0];
  
  const binary = bits.toString(2).padStart(32, '0');
  
  const sign = binary[0];
  const exponent = binary.slice(1, 9);
  const mantissa = binary.slice(9);
  
  const exponentValue = parseInt(exponent, 2);
  const actualExponent = exponentValue - 127;
  
  return {
    binary: binary,
    sign: sign,
    exponent: exponent,
    mantissa: mantissa,
    exponentValue: exponentValue,
    actualExponent: actualExponent,
    hex: '0x' + bits.toString(16).toUpperCase().padStart(8, '0')
  };
}

function doubleToBinary64(num) {
  const buffer = new ArrayBuffer(8);
  const floatView = new Float64Array(buffer);
  const intView = new Uint32Array(buffer);
  
  floatView[0] = num;
  
  // 读取两个32位整数（注意字节序）
  const low = intView[0];
  const high = intView[1];
  
  // 组合成64位二进制字符串
  const highBinary = high.toString(2).padStart(32, '0');
  const lowBinary = low.toString(2).padStart(32, '0');
  const binary = highBinary + lowBinary;
  
  const sign = binary[0];
  const exponent = binary.slice(1, 12);
  const mantissa = binary.slice(12);
  
  const exponentValue = parseInt(exponent, 2);
  const actualExponent = exponentValue - 1023;
  
  const hexHigh = high.toString(16).toUpperCase().padStart(8, '0');
  const hexLow = low.toString(16).toUpperCase().padStart(8, '0');
  
  return {
    binary: binary,
    sign: sign,
    exponent: exponent,
    mantissa: mantissa,
    exponentValue: exponentValue,
    actualExponent: actualExponent,
    hex: '0x' + hexHigh + hexLow
  };
}

function convertFloat() {
  const input = document.getElementById('float-input').value;
  const num = parseFloat(input);
  
  if (input === '') {
    document.getElementById('float-result').innerHTML = '<p class="error">请输入一个数字</p>';
    return;
  }
  
  const result = floatToBinary32(num);
  
  let specialValue = '';
  if (isNaN(num)) {
    specialValue = '<div class="special-value">特殊值: NaN (Not a Number)</div>';
  } else if (!isFinite(num)) {
    specialValue = '<div class="special-value">特殊值: ' + (num > 0 ? '正' : '负') + '无穷大</div>';
  } else if (num === 0) {
    specialValue = '<div class="special-value">特殊值: ' + (1/num > 0 ? '正' : '负') + '零</div>';
  }
  
  document.getElementById('float-result').innerHTML = `
    <div class="result-box">
      <h3>Float (32位) 结果</h3>
      
      ${specialValue}
      
      <div class="result-item">
        <strong>原始值:</strong>
        <span class="value">${num}</span>
      </div>
      
      <div class="result-item">
        <strong>完整二进制:</strong>
        <div class="binary-display">
          <span class="bit-group sign-group">${result.sign}</span>
          <span class="bit-group exp-group">${result.exponent}</span>
          <span class="bit-group mant-group">${result.mantissa}</span>
        </div>
      </div>
      
      <div class="result-item">
        <strong>十六进制:</strong>
        <span class="value hex">${result.hex}</span>
      </div>
      
      <div class="breakdown">
        <div class="breakdown-item">
          <span class="label sign">符号位:</span>
          <span class="value">${result.sign} (${result.sign === '0' ? '正' : '负'})</span>
        </div>
        <div class="breakdown-item">
          <span class="label exponent">指数位:</span>
          <span class="value">${result.exponent} (${result.exponentValue}₁₀ - 127 = ${result.actualExponent})</span>
        </div>
        <div class="breakdown-item">
          <span class="label mantissa">尾数位:</span>
          <span class="value">${result.mantissa}</span>
        </div>
      </div>
      
      ${!specialValue ? `
        <div class="formula">
          <strong>计算公式:</strong>
          <p>(-1)<sup>${result.sign}</sup> × 2<sup>${result.actualExponent}</sup> × 1.${result.mantissa}</p>
        </div>
      ` : ''}
    </div>
  `;
}

function convertDouble() {
  const input = document.getElementById('double-input').value;
  const num = parseFloat(input);
  
  if (input === '') {
    document.getElementById('double-result').innerHTML = '<p class="error">请输入一个数字</p>';
    return;
  }
  
  const result = doubleToBinary64(num);
  
  let specialValue = '';
  if (isNaN(num)) {
    specialValue = '<div class="special-value">特殊值: NaN (Not a Number)</div>';
  } else if (!isFinite(num)) {
    specialValue = '<div class="special-value">特殊值: ' + (num > 0 ? '正' : '负') + '无穷大</div>';
  } else if (num === 0) {
    specialValue = '<div class="special-value">特殊值: ' + (1/num > 0 ? '正' : '负') + '零</div>';
  }
  
  document.getElementById('double-result').innerHTML = `
    <div class="result-box">
      <h3>Double (64位) 结果</h3>
      
      ${specialValue}
      
      <div class="result-item">
        <strong>原始值:</strong>
        <span class="value">${num}</span>
      </div>
      
      <div class="result-item">
        <strong>完整二进制:</strong>
        <div class="binary-display double">
          <span class="bit-group sign-group">${result.sign}</span>
          <span class="bit-group exp-group">${result.exponent}</span>
          <span class="bit-group mant-group">${result.mantissa}</span>
        </div>
      </div>
      
      <div class="result-item">
        <strong>十六进制:</strong>
        <span class="value hex">${result.hex}</span>
      </div>
      
      <div class="breakdown">
        <div class="breakdown-item">
          <span class="label sign">符号位:</span>
          <span class="value">${result.sign} (${result.sign === '0' ? '正' : '负'})</span>
        </div>
        <div class="breakdown-item">
          <span class="label exponent">指数位:</span>
          <span class="value">${result.exponent} (${result.exponentValue}₁₀ - 1023 = ${result.actualExponent})</span>
        </div>
        <div class="breakdown-item">
          <span class="label mantissa">尾数位:</span>
          <span class="value">${result.mantissa}</span>
        </div>
      </div>
      
      ${!specialValue ? `
        <div class="formula">
          <strong>计算公式:</strong>
          <p>(-1)<sup>${result.sign}</sup> × 2<sup>${result.actualExponent}</sup> × 1.${result.mantissa}</p>
        </div>
      ` : ''}
    </div>
  `;
}

function testFloat(value) {
  document.getElementById('float-input').value = value;
  document.getElementById('double-input').value = value;
  convertFloat();
  convertDouble();
}

// 支持回车键
document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('float-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') convertFloat();
  });
  
  document.getElementById('double-input').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') convertDouble();
  });
});
</script>

<style>
.converter-page {
  max-width: 1000px;
  margin: 0 auto;
  padding: 20px;
}

.converter-page h1 {
  text-align: center;
  color: #333;
  margin: 30px 0;
}

.intro {
  text-align: center;
  margin: 20px 0 40px 0;
  color: #666;
}

.intro p {
  margin: 5px 0;
}

.converter-page h2 {
  color: #667eea;
  margin: 40px 0 20px 0;
  padding-bottom: 10px;
  border-bottom: 2px solid #667eea;
}

.converter-section {
  background: white;
  padding: 25px;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
  margin: 20px 0;
}

.input-group {
  display: flex;
  gap: 10px;
  align-items: center;
  margin-bottom: 20px;
}

.input-group label {
  font-weight: bold;
  color: #333;
  min-width: 120px;
}

.input-group input {
  flex: 1;
  padding: 12px;
  border: 2px solid #ddd;
  border-radius: 8px;
  font-size: 16px;
  font-family: 'Courier New', monospace;
}

.input-group input:focus {
  outline: none;
  border-color: #667eea;
}

.convert-btn {
  padding: 12px 30px;
  background: linear-gradient(135deg, #667eea, #764ba2);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.2s;
}

.convert-btn:hover {
  transform: translateY(-2px);
}

.result-container {
  margin-top: 20px;
}

.result-box {
  background: #f8f9fa;
  padding: 25px;
  border-radius: 10px;
  border-left: 5px solid #667eea;
}

.result-box h3 {
  margin: 0 0 20px 0;
  color: #333;
}

.result-item {
  margin: 20px 0;
}

.result-item strong {
  display: block;
  margin-bottom: 8px;
  color: #555;
}

.value {
  font-family: 'Courier New', monospace;
  font-size: 1.1em;
  color: #333;
  background: white;
  padding: 8px 12px;
  border-radius: 5px;
  display: inline-block;
}

.value.hex {
  color: #2ecc71;
  font-weight: bold;
}

.binary-display {
  font-family: 'Courier New', monospace;
  font-size: 1.1em;
  background: white;
  padding: 15px;
  border-radius: 8px;
  word-break: break-all;
  line-height: 1.8;
}

.binary-display.double {
  font-size: 0.95em;
}

.bit-group {
  padding: 4px 8px;
  margin: 2px;
  border-radius: 4px;
  display: inline-block;
}

.sign-group {
  background: #ffebee;
  color: #c62828;
  font-weight: bold;
}

.exp-group {
  background: #e3f2fd;
  color: #1565c0;
}

.mant-group {
  background: #e8f5e9;
  color: #2e7d32;
}

.breakdown {
  margin: 20px 0;
  background: white;
  padding: 15px;
  border-radius: 8px;
}

.breakdown-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 12px 0;
  padding: 10px;
  background: #f8f9fa;
  border-radius: 5px;
}

.breakdown-item .label {
  font-weight: bold;
  padding: 4px 10px;
  border-radius: 4px;
}

.breakdown-item .label.sign {
  background: #ffebee;
  color: #c62828;
}

.breakdown-item .label.exponent {
  background: #e3f2fd;
  color: #1565c0;
}

.breakdown-item .label.mantissa {
  background: #e8f5e9;
  color: #2e7d32;
}

.formula {
  margin: 20px 0;
  padding: 15px;
  background: #fff3cd;
  border-radius: 8px;
  border-left: 4px solid #ffc107;
}

.formula strong {
  color: #856404;
  display: block;
  margin-bottom: 10px;
}

.formula p {
  font-family: 'Courier New', monospace;
  font-size: 1.1em;
  margin: 0;
  color: #333;
}

.special-value {
  background: #e8f5e9;
  padding: 12px;
  border-radius: 8px;
  margin: 15px 0;
  color: #2e7d32;
  font-weight: bold;
  text-align: center;
}

.error {
  color: #dc3545;
  background: #f8d7da;
  padding: 12px;
  border-radius: 8px;
  text-align: center;
}

.info-section {
  margin: 40px 0;
  padding: 25px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.info-section h3 {
  color: #333;
  margin: 25px 0 15px 0;
}

.structure-box {
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
  margin: 15px 0;
}

.structure-item {
  margin: 15px 0;
}

.bit-label {
  display: inline-block;
  padding: 6px 15px;
  border-radius: 20px;
  font-weight: bold;
  margin-bottom: 8px;
}

.bit-label.sign {
  background: #ffebee;
  color: #c62828;
}

.bit-label.exponent {
  background: #e3f2fd;
  color: #1565c0;
}

.bit-label.mantissa {
  background: #e8f5e9;
  color: #2e7d32;
}

.structure-item p {
  margin: 5px 0;
  color: #666;
  font-size: 0.95em;
}

.test-values {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 30px 0;
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 15px rgba(0,0,0,0.1);
}

.test-btn {
  padding: 10px 20px;
  background: #e9ecef;
  border: 2px solid #dee2e6;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.2s;
  font-family: 'Courier New', monospace;
}

.test-btn:hover {
  background: #667eea;
  color: white;
  border-color: #667eea;
  transform: translateY(-2px);
}

@media (max-width: 768px) {
  .input-group {
    flex-direction: column;
    align-items: stretch;
  }
  
  .input-group label {
    min-width: auto;
  }
  
  .binary-display {
    font-size: 0.85em;
  }
  
  .breakdown-item {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
}
</style>
