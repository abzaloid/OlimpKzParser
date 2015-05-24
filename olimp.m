% take into account that NOW all dates 
% are distinct so other type of graphs will be more useful

% also may be it is better to have ddmmyyyy instead of mmyyyy
% or both graphs

clear all;
close all;

%% data initialization
data = textread('data.csv', '%s');
len = size(data, 1);
temp_data=zeros(len,3);
for i = 1:len;
    p = strsplit(data{i}, ',');
    temp_data(i,:) = [datenum(p{1}) str2num(p{2}) str2num(p{3})];
end;
data = temp_data;
date = data(:,1);
win = data(:,2);
lost = data(:,3);
win = round(win);
lost = round(lost);
date = round(date);


%% hist of win and lost
figure;
x = win(win <= 4000);
y = lost(lost<= 4000);

[dummy, t] = hist([x;y], 6);

nx = hist(x, t); % Sort x into bins.
nx = transpose(nx/sum(nx));
ny = hist(y, t); % Sort y into bins.
ny = transpose(ny/sum(ny));

% Plot bin counts as bars.
bar(t, [nx, ny])
xlabel('Probability of profit');
ylabel('Money put/got');

%% wins and losses
getm = zeros(len, 1);
putm = zeros(len, 1);
prev_get=0;
prev_put=0;
for i = 1 : len;
    if i > 1
        prev_get = getm(i - 1);
        prev_put = putm(i - 1);
    end
    getm(i) = prev_get + win(i);
    putm(i) = prev_put + lost(i);
end;
figure;
hold on;
plot(date, getm, 'g-', 'LineWidth', 3);
plot(date, putm, 'r-', 'LineWidth', 3);
set(gca,'fontsize',12);
datetick('x','dd/mm/yy', 'keeplimits', 'keepticks');
xlabel('Date');
ylabel('Money');
hold off;

%% profit long time
figure;
plot(date, getm-putm, 'r-', 'LineWidth',3);
set(gca,'fontsize',12);
datetick('x','dd/mm/yy', 'keeplimits', 'keepticks');
xlabel('Date');
ylabel('Money');
%% profit best fit line
figure;
plot(date, getm-putm, 'r-', 'LineWidth', 3);
hold on;
coeffs = polyfit(date, getm-putm, 1);
fittedX = linspace(min(date), max(date), 200);
fittedY = polyval(coeffs, fittedX);
plot(fittedX, fittedY, 'b-', 'LineWidth',3);
set(gca,'fontsize',12);
datetick('x','dd/mm/yy', 'keeplimits', 'keepticks');
xlabel('Date');
ylabel('Money');
title(sprintf('Coefficient = %.3f', (fittedY(2)-fittedY(1))/(fittedX(2)-fittedX(1))));
hold off;

%% profit best fit kdeg polynomial
figure;
k = 6;
plot(date, getm-putm, 'r-', 'LineWidth', 3);
hold on;
coeffs = polyfit(date, getm-putm, k);
fittedX = linspace(min(date), max(date), 200);
fittedY = polyval(coeffs, fittedX);
plot(fittedX, fittedY, 'b-', 'LineWidth',3);
set(gca,'fontsize',12);
datetick('x','dd/mm/yy', 'keeplimits', 'keepticks');
xlabel('Date');
ylabel('Money');
title('Best fit 6th degree function');
hold off;
%% profit future!!!
figure;
fittedX = linspace(min(date), max(date)+1000, 200);
fittedY = polyval(coeffs, fittedX);
plot(fittedX, fittedY, 'b-', 'LineWidth',3);
set(gca,'fontsize',12);
datetick('x','dd/mm/yy', 'keeplimits', 'keepticks');
datetick('x','dd/mm/yy', 'keeplimits', 'keepticks');
xlabel('Date');
ylabel('Money');
title('Future!');